"""Add the rooms from the MTO "Tourism Establishment 2026" list to the resorts already in the system.

Put this file in:   core/management/commands/load_rooms.py
and the data file:  core/data/rooms_2026.json

KUBO IS NOT A ROOM. Kubo (including "Kubo rms"), tents, cabanas, open cottages, pools and halls are never
counted. Only AC, Non-AC and plain "Rooms" become Room records.

Safe by default: it only PRINTS what it would do. Nothing is written until you add --apply.
It never deletes or changes existing rooms, except with --remove-kubo (see below).

    python manage.py load_rooms                      (preview only)
    python manage.py load_rooms --apply              (write the rooms)

Options:
    --create-missing   also create resorts that are in the list but not in the system yet
    --accept-similar   also use resorts whose name only looks similar (the preview lists them first)
    --force            add rooms even to a resort that already has rooms
    --include "Kubo,Tent"   also count those unit types (they are listed under "maybe" in the JSON)
    --top-up           for resorts that ALREADY have rooms but fewer than the list says, add only the missing ones
                       (never deletes or renames anything; resorts with more rooms than the list are left alone).
    --remove-kubo      clean up kubo "rooms" an earlier run of this command may have created (KuboRm-1, Kubo-1,
                       ACKubo-1...). A kubo with no guest records is deleted; one that already has daily logs is
                       ARCHIVED instead (kept, but left out of totals), so no data is lost.

    Typical order:   python manage.py load_rooms --remove-kubo            (preview)
                     python manage.py load_rooms --remove-kubo --apply
                     python manage.py load_rooms --apply                   (adds rooms to resorts that have none)
"""
import difflib
import json
import re
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction

from core.models import Resort, Room

DATA_FILE = Path(__file__).resolve().parents[2] / "data" / "rooms_2026.json"

# How each unit type is written in the Room no. column (room_number allows 20 characters).
PREFIX = {
    "AC": "AC-", "Non-AC": "NonAC-", "Kubo Rm": "KuboRm-", "Room": "",
    "Kubo": "Kubo-", "AC Kubo": "ACKubo-", "Tent": "Tent-", "Cabana": "Cabana-",
}


GENERIC = {"beach", "resort", "hotel", "and", "dive", "club", "the", "of"}

# room numbers this command gives to kubo units (KuboRm-1, Kubo-02, ACKubo-1), nothing else
KUBO_REGEX = r"^(KuboRm|Kubo|ACKubo)-[0-9]+$"


def core(text):
    """Distinctive part of a name: 'Salacia Beach Resort' -> 'salacia' (so 'Beach Resort' alone never makes a match)."""
    return " ".join(w for w in norm(text).split() if w not in GENERIC)


def norm(text):
    text = (text or "").lower().replace("&", " and ").replace("\u2019", "'").replace("\u00f1", "n")
    text = re.sub(r"[^a-z0-9 ]", " ", text)
    text = re.sub(r"\b(the|inc|corp|corporation|company|co)\b", " ", text)
    return " ".join(text.split())


class Command(BaseCommand):
    help = "Add rooms from the 2026 establishment list to existing resorts (preview unless --apply)."

    def add_arguments(self, parser):
        parser.add_argument("--apply", action="store_true", help="Write to the database (default: preview only).")
        parser.add_argument("--create-missing", action="store_true", help="Create resorts that are not in the system.")
        parser.add_argument("--accept-similar", action="store_true", help="Also use resorts with a similar (not identical) name.")
        parser.add_argument("--force", action="store_true", help="Add rooms even if the resort already has rooms.")
        parser.add_argument("--include", default="", help='Extra unit types to count as rooms, e.g. "Kubo,Tent".')
        parser.add_argument("--top-up", action="store_true", help="Add only the missing rooms to resorts that have fewer rooms than the list.")
        parser.add_argument("--remove-kubo", action="store_true", help="Delete/archive kubo records created as rooms by an earlier run.")

    # ------------------------------------------------------------------ matching
    def find_resort(self, entry, resorts):
        by_norm = {norm(r.name): r for r in resorts}
        for candidate in [entry["name"], *entry.get("aliases", [])]:
            if norm(candidate) in by_norm:
                return "exact", by_norm[norm(candidate)], 1.0
        target = core(entry["name"])
        best, best_score = None, 0.0
        for r in resorts:
            n = core(r.name)
            if len(target) < 5 or len(n) < 5:
                continue
            score = difflib.SequenceMatcher(None, target, n).ratio()
            if n in target or target in n:
                score = max(score, 0.9)
            if score > best_score:
                best, best_score = r, score
        if best and best_score >= 0.88:
            return "similar", best, best_score
        return None, None, 0.0

    # ------------------------------------------------------------------ top-up helper
    def topup_names(self, resort, kinds, shortfall):
        """Room numbers to add so the resort reaches the list's count. Existing rooms are never touched."""
        existing = {r.room_number.lower() for r in resort.rooms_list.all()}
        needs = []
        for kind, count in kinds.items():
            prefix = PREFIX.get(kind, kind.replace(" ", "") + "-")
            have = sum(1 for n in existing if (n.startswith(prefix.lower()) if prefix else n.isdigit()))
            needs.append([kind, prefix, max(0, count - have), count])
        if sum(n[2] for n in needs) != shortfall:
            # existing rooms are named differently from this command: just fill the gap using the main unit type
            main = max(needs, key=lambda n: n[3])
            needs = [[main[0], main[1], shortfall, main[3]]]
        names = []
        for kind, prefix, need, count in needs:
            digits = [n[len(prefix):] for n in existing if n.startswith(prefix.lower()) and n[len(prefix):].isdigit()]
            width = max([len(d) for d in digits] + [len(str(count))])
            i = 1
            while need > 0:
                cand = f"{prefix}{i:0{width}d}"
                if cand.lower() not in existing:
                    names.append(cand)
                    existing.add(cand.lower())
                    need -= 1
                i += 1
        return names

    # ------------------------------------------------------------------ main
    def handle(self, *args, **opts):
        data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
        extra = {x.strip() for x in opts["include"].split(",") if x.strip()}
        resorts = list(Resort.objects.all())
        write = opts["apply"]

        plan, report = [], {"exact": [], "similar": [], "missing": [], "no_rooms": [], "has_rooms": [], "differs": []}
        topups = []
        used_ids = set()

        for entry in data["establishments"]:
            kinds = dict(entry.get("rooms", {}))
            for kind, count in entry.get("maybe", {}).items():
                if kind in extra:
                    kinds[kind] = kinds.get(kind, 0) + count
            total = sum(kinds.values())

            how, resort, score = self.find_resort(entry, resorts)
            if resort is None:
                report["missing"].append(entry["name"])
                if opts["create_missing"] and total:
                    plan.append((entry, None, kinds, total))
                continue
            if how == "similar":
                report["similar"].append((entry["name"], resort.name, score))
                if not opts["accept_similar"]:
                    continue
            used_ids.add(resort.id)
            if not total:
                report["no_rooms"].append(resort.name)
                continue
            existing = resort.rooms_list.count()
            if existing and not opts["force"]:
                report["has_rooms"].append((resort.name, existing))
                active = resort.rooms_list.filter(is_archived=False).count()
                if active != total:
                    report["differs"].append((resort.name, active, total))
                if opts["top_up"] and active < total:
                    topups.append((resort, self.topup_names(resort, kinds, total - active)))
                continue
            plan.append((entry, resort, kinds, total))

        # ---------------------------------------------------------------- show the plan
        self.stdout.write(self.style.MIGRATE_HEADING("Rooms to add" + ("" if write else "  (PREVIEW - nothing is written)")))
        grand = 0
        for entry, resort, kinds, total in plan:
            label = resort.name if resort else f"{entry['name']}  [NEW RESORT]"
            parts = ", ".join(f"{k} x{c}" for k, c in kinds.items())
            self.stdout.write(f"  {label}: {total} rooms ({parts})")
            grand += total
        self.stdout.write(f"  -> {len(plan)} resorts, {grand} rooms\n")

        if report["similar"]:
            note = "used" if opts["accept_similar"] else "SKIPPED - check the match, then add --accept-similar"
            self.stdout.write(self.style.WARNING(f"Similar names ({note}):"))
            for pdf_name, db_name, score in report["similar"]:
                self.stdout.write(f"  list: {pdf_name}   |   system: {db_name}   ({score:.0%})")
            self.stdout.write("")
        if report["has_rooms"]:
            self.stdout.write(self.style.WARNING("Skipped, already has rooms (use --force to add anyway):"))
            for name, n in report["has_rooms"]:
                self.stdout.write(f"  {name}: {n} existing rooms")
            self.stdout.write("")
        if report["differs"]:
            self.stdout.write(self.style.WARNING("Different from the list (system vs list):"))
            for name, have, want in report["differs"]:
                note = f"{want - have} short" if have < want else f"{have - want} more than the list, left alone"
                self.stdout.write(f"  {name}: system {have}, list {want}  ({note})")
            if not opts["top_up"] and any(h < w for _, h, w in report["differs"]):
                self.stdout.write("  -> add --top-up to add only the missing rooms")
            self.stdout.write("")
        if topups:
            self.stdout.write(self.style.MIGRATE_HEADING("Rooms to top up" + ("" if write else "  (PREVIEW)")))
            for resort, names in topups:
                self.stdout.write(f"  {resort.name}: +{len(names)} ({', '.join(names)})")
            self.stdout.write("")
        if report["no_rooms"]:
            self.stdout.write("No rooms listed (only cottages, pools, etc.): " + ", ".join(report["no_rooms"]) + "\n")
        if report["missing"]:
            tail = "" if opts["create_missing"] else "  (add --create-missing to create them)"
            self.stdout.write(self.style.WARNING("In the list but NOT in the system: " + ", ".join(report["missing"]) + tail + "\n"))
        in_list = used_ids | {r.id for r in resorts if any(r.name == s for _, s, _ in report["similar"])}
        not_in_list = [r.name for r in resorts if r.id not in in_list]
        if not_in_list:
            self.stdout.write("In the system but not in the list (left untouched): " + ", ".join(not_in_list) + "\n")

        kubo_rooms = []
        if opts["remove_kubo"]:
            kubo_rooms = list(
                Room.objects.filter(room_number__iregex=KUBO_REGEX).select_related("resort").order_by("resort__name", "room_number")
            )
            self.stdout.write(self.style.MIGRATE_HEADING("Kubo records to remove" + ("" if write else "  (PREVIEW)")))
            if not kubo_rooms:
                self.stdout.write("  none found\n")
            for room in kubo_rooms:
                has_logs = room.daily_logs.exists()
                self.stdout.write(f"  {room.resort.name}: {room.room_number}  -> " + ("ARCHIVE (has guest logs)" if has_logs else "delete"))
            self.stdout.write("")

        if not write:
            self.stdout.write(self.style.SUCCESS("Preview only. Run again with --apply to write these changes."))
            return

        removed, archived = 0, 0
        if kubo_rooms:
            with transaction.atomic():
                touched = {}
                for room in kubo_rooms:
                    touched[room.resort_id] = room.resort
                    if room.daily_logs.exists():
                        if not room.is_archived:
                            room.is_archived = True
                            room.save(update_fields=["is_archived"])
                        archived += 1
                    else:
                        room.delete()
                        removed += 1
                for resort in touched.values():
                    resort.total_rooms = resort.rooms_list.filter(is_archived=False).count()
                    resort.save(update_fields=["total_rooms"])
            self.stdout.write(self.style.SUCCESS(f"Kubo cleanup: deleted {removed}, archived {archived}."))

        # ---------------------------------------------------------------- write
        created_rooms, created_resorts = 0, 0
        with transaction.atomic():
            for entry, resort, kinds, total in plan:
                if resort is None:
                    resort = Resort.objects.create(
                        name=entry["name"], barangay=entry.get("barangay", ""), address=entry.get("address", ""), status="active",
                    )
                    created_resorts += 1
                for kind, count in kinds.items():
                    prefix = PREFIX.get(kind, kind.replace(" ", "") + "-")
                    width = len(str(count))   # AC-01 ... AC-28 so the rooms sort in the right order
                    for i in range(1, count + 1):
                        _, was_new = Room.objects.get_or_create(resort=resort, room_number=f"{prefix}{i:0{width}d}")
                        created_rooms += int(was_new)
                resort.total_rooms = resort.rooms_list.filter(is_archived=False).count()
                resort.save(update_fields=["total_rooms"])
        if topups:
            with transaction.atomic():
                for resort, names in topups:
                    for room_number in names:
                        _, was_new = Room.objects.get_or_create(resort=resort, room_number=room_number)
                        created_rooms += int(was_new)
                    resort.total_rooms = resort.rooms_list.filter(is_archived=False).count()
                    resort.save(update_fields=["total_rooms"])
        self.stdout.write(self.style.SUCCESS(
            f"Done. Created {created_rooms} rooms" + (f" and {created_resorts} resorts" if created_resorts else "") + "."
        ))