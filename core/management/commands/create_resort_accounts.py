from django.core.management.base import BaseCommand
from django.utils.text import slugify

from core.models import Resort, SystemUser

DEFAULT_PASSWORD = "Bauan@2026"


class Command(BaseCommand):
    help = "Create one approved resort-staff account per Resort (username = slug of resort name)."

    def handle(self, *args, **options):
        created, skipped = 0, 0
        for resort in Resort.objects.all():
            base_username = slugify(resort.name)[:140] or f"resort{resort.id}"
            username = base_username
            suffix = 1
            while SystemUser.objects.filter(username=username).exclude(resort=resort).exists():
                suffix += 1
                username = f"{base_username}-{suffix}"

            user, was_created = SystemUser.objects.get_or_create(
                resort=resort,
                role="resort",
                defaults={
                    "username": username,
                    "status": "approved",
                    "is_active": True,
                },
            )
            if was_created:
                user.set_password(DEFAULT_PASSWORD)
                user.save()
                created += 1
            else:
                skipped += 1

        self.stdout.write(self.style.SUCCESS(f"Created {created} resort accounts, skipped {skipped} (already had one)."))
        self.stdout.write(f"Default password for all new accounts: {DEFAULT_PASSWORD}")
        self.stdout.write("Usernames follow the resort name, e.g. 'sheik-and-grace-beach-resort'.")