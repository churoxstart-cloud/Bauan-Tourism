"""Put the monthly totals from the paper DAE forms into the daily room log.

The portal keeps visitor data per room per day (RoomDailyLog), and every report adds those rows up.
A paper form only has monthly totals, so each month is written as rows that add up EXACTLY to the form:

  * "Rooms Occupied" on the form = that many occupied room-nights, spread over the month
    across the resort's existing rooms (no new rooms are made up);
  * guests, male/female and place of residence are split evenly over those rows;
  * nationality goes on the first row of the month.

Safe by default:
  python manage.py import_monthly_forms                 -> preview only, nothing is written
  python manage.py import_monthly_forms --apply         -> writes it (all-or-nothing)
  python manage.py import_monthly_forms --apply --replace
        -> months that already have daily logs: those logs are ARCHIVED (Recycle Bin, restorable) and replaced
  python manage.py import_monthly_forms --undo          -> deletes exactly the rows a previous --apply made

Without --replace, a month that already has daily logs is skipped, so nothing is ever counted twice.
"""
import calendar
import csv
import datetime as dt
import json
import os
import re

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from core.models import Resort, RoomDailyLog

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_CSV = os.path.join(HERE, "..", "..", "data", "monthly_forms_2026.csv")
UNDO_FILE = os.path.join(HERE, "..", "..", "data", "monthly_forms_imported_ids.json")
FIELDS = ["mun_m", "mun_f", "prov_m", "prov_f", "other_m", "other_f", "foreign_m", "foreign_f",
          "checked_in", "guest_nights", "rooms_occupied"]


def _norm(s):
    s = re.sub(r"[^a-z0-9 ]+", " ", str(s).lower().replace("&", " and "))
    return [w for w in s.split() if w not in {"the", "inc", "incorporated", "corp", "corporation", "co", "company"}]


def find_resort(name, resorts):
    """Exact name first; otherwise the one resort whose name contains every word of the form's name
    ('Bauan Plaza Hotel' -> 'Bauan Plaza Hotel Resort And Leisure Corporation')."""
    want = _norm(name)
    exact = [r for r in resorts if _norm(r.name) == want]
    if exact:
        return exact[0], None
    hits = [r for r in resorts if all(w in _norm(r.name) for w in want)]
    if len(hits) == 1:
        return hits[0], None
    if not hits:
        return None, f"no resort named like '{name}'"
    return None, f"'{name}' matches several resorts: " + ", ".join(r.name for r in hits[:4])


def split(total, n):
    """total split into n whole numbers that add up exactly (bigger parts first)."""
    base, extra = divmod(total, n)
    return [base + (1 if i < extra else 0) for i in range(n)]


class Command(BaseCommand):
    help = "Import monthly totals from the paper visitor forms into the daily room log (preview unless --apply)."

    def add_arguments(self, parser):
        parser.add_argument("csv", nargs="?", default=DEFAULT_CSV, help="CSV file (default: core/data/monthly_forms_2026.csv)")
        parser.add_argument("--apply", action="store_true", help="write to the database (otherwise preview only)")
        parser.add_argument("--replace", action="store_true", help="archive existing daily logs of those months and replace them")
        parser.add_argument("--undo", action="store_true", help="delete the rows made by the last --apply")

    def handle(self, *args, **opts):
        if opts["undo"]:
            return self.undo()
        path = os.path.abspath(opts["csv"])
        if not os.path.exists(path):
            raise CommandError(f"File not found: {path}")
        with open(path, encoding="utf-8-sig", newline="") as fh:
            rows = list(csv.DictReader(fh))

        resorts = list(Resort.objects.all())
        plan, problems, skipped, notes = [], [], [], []
        for i, row in enumerate(rows, start=2):
            label = f"line {i}: {row.get('resort', '?')} {row.get('month', '?')}/{row.get('year', '?')}"
            try:
                year, month = int(row["year"]), int(row["month"])
                vals = {f: int(str(row.get(f) or 0).strip() or 0) for f in FIELDS}
            except (KeyError, ValueError) as exc:
                problems.append(f"{label}: bad number ({exc})")
                continue
            if any(v < 0 for v in vals.values()) or not 1 <= month <= 12:
                problems.append(f"{label}: negative number or wrong month")
                continue
            resort, err = find_resort(row["resort"], resorts)
            if err:
                problems.append(f"{label}: {err}")
                continue
            if (row.get("check") or "").strip():
                notes.append(f"{resort.name} {calendar.month_abbr[month]}: {row['check'].strip()}")

            visitors = sum(vals[f] for f in FIELDS[:8])
            all_zero = not visitors and not vals["checked_in"] and not vals["guest_nights"] and not vals["rooms_occupied"]
            existing = RoomDailyLog.objects.filter(room__resort=resort, log_date__year=year, log_date__month=month, is_archived=False)
            if existing.exists() and not opts["replace"]:
                skipped.append(f"{resort.name} {calendar.month_name[month]} {year}: already has {existing.count()} daily log row(s)"
                               + (" but the form says 0" if all_zero else "") + " - skipped (use --replace)")
                continue
            if all_zero:
                if existing.exists():                      # the form says 0: the old rows are archived, nothing added
                    plan.append((resort, year, month, vals, "", [], 0, existing))
                continue

            rooms = list(resort.rooms_list.filter(is_archived=False).order_by("id"))
            days = calendar.monthrange(year, month)[1]
            occupied = vals["rooms_occupied"]
            if not rooms:
                problems.append(f"{label}: {resort.name} has no rooms in the portal yet. Add its rooms first.")
                continue
            if occupied > len(rooms) * days:
                problems.append(f"{label}: {occupied} rooms occupied, but {resort.name} has only {len(rooms)} rooms x {days} days "
                                f"= {len(rooms) * days} room-nights. Add its missing rooms first.")
                continue
            plan.append((resort, year, month, vals, (row.get("nationality") or "").strip()[:100], rooms, days, existing))

        # ---- report
        self.stdout.write(self.style.MIGRATE_HEADING(f"\n{len(plan)} resort-month(s) ready to import from {os.path.basename(path)}"))
        for resort, year, month, v, nat, rooms, days, existing in plan:
            visitors = sum(v[f] for f in FIELDS[:8])
            if not rooms:
                self.stdout.write(f"  {resort.name[:38]:38} {calendar.month_abbr[month]} {year}: form says 0  (archives {existing.count()} existing rows)")
                continue
            extra = f"  (replaces {existing.count()} existing rows)" if existing.exists() else ""
            self.stdout.write(f"  {resort.name[:38]:38} {calendar.month_abbr[month]} {year}: visitors {visitors:5}, "
                              f"checked-in {v['checked_in']:4}, guest nights {v['guest_nights']:4}, rooms occupied {v['rooms_occupied']:3}{extra}")
        for s in skipped:
            self.stdout.write(self.style.WARNING("  SKIPPED " + s))
        for p in problems:
            self.stdout.write(self.style.ERROR("  PROBLEM " + p))
        if notes:
            self.stdout.write(self.style.NOTICE("\nPlease double-check these against the paper forms:"))
            for n in notes:
                self.stdout.write("  - " + n)

        if not opts["apply"]:
            self.stdout.write(self.style.WARNING("\nPreview only. Nothing was written. Run again with --apply to save."))
            return
        if problems:
            raise CommandError("Fix the problems above first. Nothing was written.")
        if os.path.exists(UNDO_FILE):
            raise CommandError("An earlier import is still recorded. Run with --undo first (or delete core/data/monthly_forms_imported_ids.json if you want to keep it).")

        made, archived_ids = [], []
        with transaction.atomic():
            for resort, year, month, v, nat, rooms, days, existing in plan:
                if existing.exists():
                    ids = list(existing.values_list("id", flat=True))
                    archived_ids += ids
                    RoomDailyLog.objects.filter(id__in=ids).update(is_archived=True)
                if not rooms:
                    continue
                # room-nights: day 1..N on room 1, then day 1..N on room 2, ... (unique per room and day)
                n_occ = v["rooms_occupied"]
                slots = [(rooms[k // days], dt.date(year, month, k % days + 1)) for k in range(max(n_occ, 1))]
                # days already used by archived rows would clash with the unique (room, date) rule: reuse those rows
                parts = {f: split(v[f], len(slots)) for f in FIELDS[:10]}
                for k, (room, day) in enumerate(slots):
                    data = dict(
                        guests_checked_in=parts["checked_in"][k], guests_overnight=parts["guest_nights"][k],
                        rooms_occupied=n_occ > 0,
                        male=parts["mun_m"][k] + parts["prov_m"][k] + parts["other_m"][k] + parts["foreign_m"][k],
                        female=parts["mun_f"][k] + parts["prov_f"][k] + parts["other_f"][k] + parts["foreign_f"][k],
                        this_municipality=parts["mun_m"][k] + parts["mun_f"][k],
                        this_province=parts["prov_m"][k] + parts["prov_f"][k],
                        other_province=parts["other_m"][k] + parts["other_f"][k],
                        foreign_country=parts["foreign_m"][k] + parts["foreign_f"][k],
                        nationality=nat if k == 0 else "",
                        is_archived=False,
                    )
                    old = RoomDailyLog.objects.filter(room=room, log_date=day).first()
                    if old is not None:
                        # only possible with --replace (the row was just archived); keep a copy of it
                        made.append({"id": old.id, "restore": {f: getattr(old, f) for f in data} | {"is_archived": True}})
                        for f, val in data.items():
                            setattr(old, f, val)
                        old.save()
                    else:
                        made.append({"id": RoomDailyLog.objects.create(room=room, log_date=day, **data).id})
        with open(UNDO_FILE, "w", encoding="utf-8") as fh:
            json.dump({"made": made, "archived": archived_ids}, fh, default=str)
        msg = f"\nSaved {len(made)} daily log rows for {len(plan)} resort-month(s)."
        if archived_ids:
            msg += f" {len(archived_ids)} earlier row(s) were archived (Recycle Bin)."
        self.stdout.write(self.style.SUCCESS(msg + " To take it back: python manage.py import_monthly_forms --undo"))

    def undo(self):
        if not os.path.exists(UNDO_FILE):
            raise CommandError("Nothing to undo (no earlier import is recorded).")
        with open(UNDO_FILE, encoding="utf-8") as fh:
            saved = json.load(fh)
        deleted = 0
        with transaction.atomic():
            for item in saved["made"]:
                if "restore" in item:
                    RoomDailyLog.objects.filter(id=item["id"]).update(**item["restore"])
                else:
                    deleted += RoomDailyLog.objects.filter(id=item["id"]).delete()[0]
            back = RoomDailyLog.objects.filter(id__in=saved["archived"]).update(is_archived=False)
        os.remove(UNDO_FILE)
        self.stdout.write(self.style.SUCCESS(f"Undone: {deleted} imported row(s) deleted and {back} earlier row(s) brought back from the archive."))
