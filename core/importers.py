"""Import of DAE-1A daily room logs from an Excel (.xlsx) or CSV file.

Same layout as the portal's own "Export to Excel" (and the printed DAE-1A rows):
    [Resort] | Date | Room No. | Guests Check-in | Guests Overnight | Rooms Occupied | Male | Female
    | This Municipality | This Province | Other Province | Foreign | Nationality

Two steps so nothing is written by surprise:
    analyze(...)  reads the file and returns a report (what would be created / updated, and every problem)
    apply(...)    writes it, all-or-nothing, in one transaction
"""
import csv
import datetime as dt
import difflib
import io
import re
import unicodedata
from dataclasses import dataclass, field

from django.db import transaction

from .models import Resort, Room, RoomDailyLog

MAX_BYTES = 5 * 1024 * 1024
MAX_ROWS = 60000
MAX_ERRORS_SHOWN = 200
NUM_FIELDS = [
    "guests_checked_in", "guests_overnight", "male", "female",
    "this_municipality", "this_province", "other_province", "foreign_country",
]
NUM_LABELS = {
    "guests_checked_in": "Guests Check-in", "guests_overnight": "Guests Overnight", "male": "Male", "female": "Female",
    "this_municipality": "This Municipality", "this_province": "This Province",
    "other_province": "Other Province", "foreign_country": "Foreign",
}
TEMPLATE_HEADERS = [
    "Resort", "Date", "Room No.", "Guests Check-in", "Guests Overnight", "Rooms Occupied",
    "Male", "Female", "This Municipality", "This Province", "Other Province", "Foreign", "Nationality",
]

_ALIASES = {
    "resort": ["resort", "resort name", "establishment", "name of establishment", "accommodation"],
    "date": ["date", "petsa", "log date"],
    "room": ["room no", "room number", "room", "room #", "room no."],
    "guests_checked_in": ["guests check in", "guests checkin", "check in", "checkin", "check ins", "number of guests check in", "guests check-in"],
    "guests_overnight": ["guests overnight", "overnight", "guest nights", "guests staying overnight", "guests staying over night", "guest night", "guests over night"],
    "rooms_occupied": ["rooms occupied", "occupied", "room occupied", "rooms occupied by guests"],
    "male": ["male", "m"],
    "female": ["female", "f"],
    "this_municipality": ["this municipality", "municipality", "this municipality bauan"],
    "this_province": ["this province", "province"],
    "other_province": ["other province", "other provinces"],
    "foreign_country": ["foreign", "foreign country", "foreigners"],
    "nationality": ["nationality", "nationalities"],
}


def _clean(text):
    text = unicodedata.normalize("NFKD", str(text or "")).encode("ascii", "ignore").decode().lower()
    text = re.sub(r"[^a-z0-9#]+", " ", text)
    return " ".join(text.split())


HEADER_LOOKUP = {_clean(alias): key for key, names in _ALIASES.items() for alias in names}


def norm_name(text):
    text = _clean(str(text).replace("&", " and "))
    return " ".join(w for w in text.split() if w not in {"the", "inc", "incorporated", "corp", "corporation", "co", "company"})


def room_key(value):
    """'01', '1' and ' 1 ' are the same room; 'A-1' and 'a-1' too."""
    v = str(value or "").strip()
    if v.endswith(".0") and v[:-2].isdigit():
        v = v[:-2]
    return str(int(v)) if v.isdigit() else v.lower()


def parse_date(value):
    if isinstance(value, dt.datetime):
        return value.date()
    if isinstance(value, dt.date):
        return value
    s = str(value or "").strip()
    if not s:
        return None
    for fmt in ("%Y-%m-%d", "%Y/%m/%d", "%m/%d/%Y", "%m-%d-%Y", "%B %d, %Y", "%b %d, %Y", "%d %B %Y", "%d %b %Y", "%m/%d/%y"):
        try:
            return dt.datetime.strptime(s, fmt).date()
        except ValueError:
            continue
    raise ValueError(f"'{s[:30]}' is not a valid date (use YYYY-MM-DD, for example 2026-03-15)")


def parse_count(value, label):
    if value is None or str(value).strip() == "":
        return 0
    if isinstance(value, bool):
        return int(value)
    try:
        n = float(str(value).replace(",", "").strip())
    except ValueError:
        raise ValueError(f"{label} must be a whole number (got '{value}')")
    if n != int(n):
        raise ValueError(f"{label} must be a whole number (got '{value}')")
    if n < 0:
        raise ValueError(f"{label} cannot be negative (got {int(n)})")
    return int(n)


_YES = {"yes", "y", "true", "1", "x", "occupied", "oo", "✓", "✔"}
_NO = {"no", "n", "false", "0", "vacant", "hindi"}


def parse_occupied(value):
    """True / False, or None when blank (then it is worked out from the guest counts)."""
    if value is None or str(value).strip() == "":
        return None
    s = str(value).strip().lower()
    if s in _YES:
        return True
    if s in _NO:
        return False
    raise ValueError(f"Rooms Occupied must be Yes or No (got '{value}')")


class ImportFileError(Exception):
    """The file itself cannot be read (wrong type, no header, too big...)."""


def _find_header(rows):
    for idx, row in enumerate(rows[:15]):
        mapping = {}
        for col, cell in enumerate(row):
            key = HEADER_LOOKUP.get(_clean(cell))
            if key and key not in mapping.values():
                mapping[col] = key
        if "date" in mapping.values() and "room" in mapping.values():
            return idx, mapping
    return None, None


def read_table(filename, data):
    """-> (mapping {column index: key}, [(file row number, [cells])]). Raises ImportFileError."""
    name = (filename or "").lower()
    if len(data) > MAX_BYTES:
        raise ImportFileError(f"The file is too large (limit {MAX_BYTES // (1024 * 1024)} MB). Split it by month and try again.")
    if name.endswith(".xlsx") or name.endswith(".xlsm"):
        import openpyxl
        try:
            wb = openpyxl.load_workbook(io.BytesIO(data), read_only=True, data_only=True)
        except Exception:
            raise ImportFileError("This file could not be opened as an Excel (.xlsx) workbook. If it is an old .xls file, open it in Excel and use Save As .xlsx.")
        for ws in wb.worksheets:
            rows = []
            for i, r in enumerate(ws.iter_rows(values_only=True), start=1):
                rows.append(list(r))
                if i > MAX_ROWS + 20:
                    raise ImportFileError(f"The file has more than {MAX_ROWS:,} rows. Split it by month or by resort and try again.")
            hidx, mapping = _find_header(rows)
            if mapping:
                return mapping, [(hidx + 2 + i, r) for i, r in enumerate(rows[hidx + 1:])]
        raise ImportFileError("Could not find the header row. The file needs at least the columns 'Date' and 'Room No.'. Download the template to see the layout.")
    if name.endswith(".csv") or name.endswith(".txt"):
        try:
            text = data.decode("utf-8-sig")
        except UnicodeDecodeError:
            text = data.decode("latin-1")
        try:
            dialect = csv.Sniffer().sniff(text[:4096], delimiters=",;\t")
        except csv.Error:
            dialect = csv.excel
        rows = list(csv.reader(io.StringIO(text), dialect))
        if len(rows) > MAX_ROWS + 20:
            raise ImportFileError(f"The file has more than {MAX_ROWS:,} rows. Split it and try again.")
        hidx, mapping = _find_header(rows)
        if not mapping:
            raise ImportFileError("Could not find the header row. The file needs at least the columns 'Date' and 'Room No.'.")
        return mapping, [(hidx + 2 + i, r) for i, r in enumerate(rows[hidx + 1:])]
    raise ImportFileError("Please upload an Excel file (.xlsx) or a CSV file. Old .xls files: open in Excel and Save As .xlsx.")


@dataclass
class PlannedRow:
    row_no: int
    resort_id: int
    room_number: str
    room_id: object          # int, or None when the room will be created
    log_date: dt.date
    values: dict
    action: str              # create | update | unchanged | skip_archived
    existing_id: object = None


@dataclass
class Report:
    rows: list = field(default_factory=list)
    errors: list = field(default_factory=list)       # (row number, message)
    warnings: list = field(default_factory=list)
    rows_read: int = 0
    new_rooms: dict = field(default_factory=dict)    # resort_id -> set of room numbers to create
    resort_names: dict = field(default_factory=dict)
    fatal: str = ""

    def count(self, action):
        return sum(1 for r in self.rows if r.action == action)

    @property
    def created(self): return self.count("create")
    @property
    def updated(self): return self.count("update")
    @property
    def unchanged(self): return self.count("unchanged")
    @property
    def skipped(self): return self.count("skip_archived")
    @property
    def writable(self): return self.created + self.updated
    @property
    def date_range(self):
        ds = [r.log_date for r in self.rows]
        return (min(ds), max(ds)) if ds else None
    @property
    def error_count(self): return len(self.errors)
    @property
    def new_room_count(self): return sum(len(v) for v in self.new_rooms.values())
    @property
    def resort_list(self):
        return sorted({self.resort_names[r.resort_id] for r in self.rows})


def _cell(row, col_index):
    return row[col_index] if col_index is not None and col_index < len(row) else None


def analyze(user, filename, data, resort_choice=None, create_rooms=False):
    """Read and check the file against the database. Nothing is written."""
    report = Report()
    try:
        mapping, table = read_table(filename, data)
    except ImportFileError as exc:
        report.fatal = str(exc)
        return report
    col = {key: idx for idx, key in mapping.items()}

    own = user.resort if user.role == "resort" else None
    if user.role == "resort" and own is None:
        report.fatal = "Your account is not linked to a resort yet, so there is nothing to import into."
        return report
    resorts = [own] if own else list(Resort.objects.all())
    by_name = {norm_name(r.name): r for r in resorts}
    chosen = own if own else (next((r for r in resorts if str(r.id) == str(resort_choice)), None) if resort_choice else None)
    if not own and "resort" not in col and chosen is None:
        report.fatal = "Choose which resort this file is for, or add a 'Resort' column to the file."
        return report

    def resolve_resort(raw):
        raw = str(raw).strip() if raw is not None else ""
        if not raw:
            return chosen, None
        if own:
            # resort staff: the Resort column is only a double-check that the file is really theirs
            same = norm_name(raw) == norm_name(own.name) or difflib.SequenceMatcher(None, norm_name(raw), norm_name(own.name)).ratio() >= 0.85
            if same:
                return own, None
            return None, f"This row is for '{raw}', but your account is for '{own.name}'. Resort staff can only import their own resort."
        hit = by_name.get(norm_name(raw))
        if hit is None:
            close = difflib.get_close_matches(norm_name(raw), list(by_name), n=1, cutoff=0.78)
            if close:
                return None, f"Resort '{raw}' was not found. Did you mean '{by_name[close[0]].name}'?"
            return None, f"Resort '{raw}' was not found in the portal."
        return hit, None

    rooms_cache, seen, planned = {}, {}, []
    today = dt.date.today()

    def rooms_of(resort):
        if resort.id not in rooms_cache:
            rooms_cache[resort.id] = {room_key(r.room_number): r for r in Room.objects.filter(resort=resort)}
        return rooms_cache[resort.id]

    def err(row_no, msg):
        report.errors.append((row_no, msg))

    for row_no, row in table:
        if not any(str(c).strip() for c in row if c is not None):
            continue
        report.rows_read += 1
        if report.rows_read > MAX_ROWS:
            report.fatal = f"The file has more than {MAX_ROWS:,} data rows. Split it by month or by resort and try again."
            return report

        resort, msg = resolve_resort(_cell(row, col.get("resort")))
        if msg:
            err(row_no, msg); continue
        if resort is None:
            err(row_no, "No resort for this row. Choose a resort above or fill in the Resort column."); continue
        report.resort_names[resort.id] = resort.name

        try:
            log_date = parse_date(_cell(row, col["date"]))
        except ValueError as exc:
            err(row_no, f"Date: {exc}"); continue
        if log_date is None:
            err(row_no, "Date is empty."); continue
        if log_date > today:
            err(row_no, f"Date {log_date:%Y-%m-%d} is in the future."); continue
        if log_date.year < 2000:
            err(row_no, f"Date {log_date:%Y-%m-%d} looks wrong (before the year 2000)."); continue

        raw_room = _cell(row, col["room"])
        room_no = str(raw_room).strip() if raw_room is not None else ""
        if room_no.endswith(".0") and room_no[:-2].isdigit():
            room_no = room_no[:-2]
        if not room_no:
            err(row_no, "Room No. is empty."); continue
        if len(room_no) > 20:
            err(row_no, f"Room No. '{room_no[:24]}...' is longer than 20 characters."); continue

        values, bad = {}, False
        for key in NUM_FIELDS:
            try:
                values[key] = parse_count(_cell(row, col.get(key)), NUM_LABELS[key])
            except ValueError as exc:
                err(row_no, str(exc)); bad = True; break
        if bad:
            continue
        try:
            occupied = parse_occupied(_cell(row, col.get("rooms_occupied")))
        except ValueError as exc:
            err(row_no, str(exc)); continue
        if occupied is None:
            occupied = values["guests_overnight"] > 0 or values["guests_checked_in"] > 0
        elif occupied is False and (values["guests_overnight"] or values["guests_checked_in"]):
            err(row_no, "Rooms Occupied is 'No' but there are guests on this row. Set it to Yes, or clear the guest numbers."); continue
        values["rooms_occupied"] = occupied
        nat = _cell(row, col.get("nationality"))
        values["nationality"] = (str(nat).strip() if nat is not None else "")[:100]

        key = (resort.id, room_key(room_no), log_date)
        if key in seen:
            err(row_no, f"Duplicate: room {room_no} on {log_date:%Y-%m-%d} already appears on row {seen[key]}."); continue
        seen[key] = row_no

        room = rooms_of(resort).get(room_key(room_no))
        if room is None:
            if not create_rooms:
                err(row_no, f"Room '{room_no}' does not exist in {resort.name}. Add it under Manage Rooms, or tick 'Create rooms that don't exist yet'."); continue
            report.new_rooms.setdefault(resort.id, set()).add(room_no)
            planned.append(PlannedRow(row_no, resort.id, room_no, None, log_date, values, "create"))
            continue
        if room.is_archived:
            err(row_no, f"Room '{room_no}' is archived. Restore it in the Recycle Bin first."); continue
        planned.append(PlannedRow(row_no, resort.id, room.room_number, room.id, log_date, values, "create"))

    if planned:
        ids = {p.room_id for p in planned if p.room_id}
        lo, hi = min(p.log_date for p in planned), max(p.log_date for p in planned)
        existing = {}
        if ids:
            for log in RoomDailyLog.objects.filter(room_id__in=ids, log_date__gte=lo, log_date__lte=hi):
                existing[(log.room_id, log.log_date)] = log
        for p in planned:
            old = existing.get((p.room_id, p.log_date)) if p.room_id else None
            if old is None:
                p.action = "create"
            elif old.is_archived:
                p.action = "skip_archived"
                report.warnings.append(f"Row {p.row_no}: {p.log_date:%Y-%m-%d}, room {p.room_number} is on an archived day, so it was skipped.")
            else:
                p.existing_id = old.id
                p.action = "unchanged" if all(getattr(old, k) == v for k, v in p.values.items()) else "update"
        report.rows = planned

    big = [p for p in report.rows if p.values["guests_overnight"] > 40 or p.values["guests_checked_in"] > 40]
    if big:
        report.warnings.append(f"{len(big)} row(s) have more than 40 guests in a single room (first: row {big[0].row_no}). Please double-check these are not typos.")
    return report


def apply(report):
    """Write the planned rows. All-or-nothing. Returns (created, updated, rooms_created)."""
    rooms_created = 0
    with transaction.atomic():
        room_ids = {}
        for resort_id, numbers in report.new_rooms.items():
            resort = Resort.objects.select_for_update().get(pk=resort_id)
            for number in sorted(numbers):
                room, was_new = Room.objects.get_or_create(resort=resort, room_number=number)
                room_ids[(resort_id, room_key(number))] = room.id
                rooms_created += int(was_new)
            resort.total_rooms = resort.rooms_list.filter(is_archived=False).count()
            resort.save(update_fields=["total_rooms"])

        to_create, to_update = [], []
        for p in report.rows:
            if p.action == "create":
                rid = p.room_id or room_ids[(p.resort_id, room_key(p.room_number))]
                to_create.append(RoomDailyLog(room_id=rid, log_date=p.log_date, **p.values))
            elif p.action == "update":
                to_update.append(RoomDailyLog(pk=p.existing_id, room_id=p.room_id, log_date=p.log_date, **p.values))
        RoomDailyLog.objects.bulk_create(to_create, batch_size=500)
        if to_update:
            RoomDailyLog.objects.bulk_update(to_update, NUM_FIELDS + ["rooms_occupied", "nationality"], batch_size=500)
    return len(to_create), len(to_update), rooms_created
