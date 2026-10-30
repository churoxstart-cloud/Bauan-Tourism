"""Add the rooms from the MTO "Tourism Establishment 2026" list to the resorts already in the system.

Put this file in:   core/management/commands/load_rooms.py
and the data file:  core/data/rooms_2026.json

Safe by default: it only PRINTS what it would do. Nothing is written until you add --apply.
It never deletes or changes existing rooms.

    python manage.py load_rooms                      (preview only)
    python manage.py load_rooms --apply              (write the rooms)

Options:
    --create-missing   also create resorts that are in the list but not in the system yet
    --accept-similar   also use resorts whose name only looks similar (the preview lists them first)
    --force            add rooms even to a resort that already has rooms
    --include "Kubo,Tent"   also count those unit types (they are listed under "maybe" in the JSON)
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

    # ------------------------------------------------------------------ main
    def handle(self, *args, **opts):
        data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
        extra = {x.strip() for x in opts["include"].split(",") if x.strip()}
        resorts = list(Resort.objects.all())
        write = opts["apply"]

        plan, report = [], {"exact": [], "similar": [], "missing": [], "no_rooms": [], "has_rooms": []}
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
        if report["no_rooms"]:
            self.stdout.write("No rooms listed (only cottages, pools, etc.): " + ", ".join(report["no_rooms"]) + "\n")
        if report["missing"]:
            tail = "" if opts["create_missing"] else "  (add --create-missing to create them)"
            self.stdout.write(self.style.WARNING("In the list but NOT in the system: " + ", ".join(report["missing"]) + tail + "\n"))
        in_list = used_ids | {r.id for r in resorts if any(r.name == s for _, s, _ in report["similar"])}
        not_in_list = [r.name for r in resorts if r.id not in in_list]
        if not_in_list:
            self.stdout.write("In the system but not in the list (left untouched): " + ", ".join(not_in_list) + "\n")

        if not write:
            self.stdout.write(self.style.SUCCESS("Preview only. Run again with --apply to write these rooms."))
            return

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
        self.stdout.write(self.style.SUCCESS(
            f"Done. Created {created_rooms} rooms" + (f" and {created_resorts} resorts" if created_resorts else "") + "."
        ))