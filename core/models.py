from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Count, Q, Sum

class Resort(models.Model):
    name = models.CharField(max_length=150)
    barangay = models.CharField(max_length=100)
    address = models.CharField(max_length=255, blank=True)
    owner_name = models.CharField(max_length=150, blank=True)
    total_rooms = models.PositiveIntegerField(default=0)
    contact_number = models.CharField(max_length=30, blank=True)
    status = models.CharField(
        max_length=20,
        choices=[("active", "Active"), ("inactive", "Inactive")],
        default="active",
    )

    def __str__(self):
        return self.name


class SystemUser(AbstractUser):
    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("mto", "MTO Staff"),
        ("resort", "Resort Staff"),
    ]
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("disabled", "Disabled"),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="resort")
    resort = models.ForeignKey(
        Resort, on_delete=models.SET_NULL, null=True, blank=True, related_name="staff"
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")

    def __str__(self):
        return f"{self.username} ({self.role})"


class Room(models.Model):
    resort = models.ForeignKey(Resort, on_delete=models.CASCADE, related_name="rooms_list")
    room_number = models.CharField(max_length=20)
    capacity = models.PositiveIntegerField(default=1)
    is_archived = models.BooleanField(default=False)

    class Meta:
        unique_together = ("resort", "room_number")
        ordering = ["room_number"]

    def __str__(self):
        return f"{self.resort.name} - Room {self.room_number}"


class RoomDailyLog(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="daily_logs")
    log_date = models.DateField()

    guests_checked_in = models.PositiveIntegerField(default=0)
    guests_overnight = models.PositiveIntegerField(default=0)
    rooms_occupied = models.BooleanField(default=False)

    male = models.PositiveIntegerField(default=0)
    female = models.PositiveIntegerField(default=0)

    this_municipality = models.PositiveIntegerField(default=0)
    this_province = models.PositiveIntegerField(default=0)
    other_province = models.PositiveIntegerField(default=0)
    foreign_country = models.PositiveIntegerField(default=0)

    nationality = models.CharField(max_length=100, blank=True)

    # Archived days are kept (and can be restored) but left out of every total and report.
    is_archived = models.BooleanField(default=False)

    class Meta:
        unique_together = ("room", "log_date")
        ordering = ["log_date"]

    def __str__(self):
        return f"{self.room} - {self.log_date}"


class Attraction(models.Model):
    ATTRACTION_TYPES = [
        ("beach", "Beach"),
        ("falls", "Falls"),
        ("heritage", "Heritage site"),
        ("event", "Event/Festival"),
        ("other", "Other"),
    ]
    resort = models.ForeignKey(Resort, on_delete=models.CASCADE, related_name="attractions")
    name = models.CharField(max_length=150)
    attraction_type = models.CharField(max_length=20, choices=ATTRACTION_TYPES, default="other")
    status = models.CharField(max_length=20, default="active")

    def __str__(self):
        return self.name


class AttractionVisitorLog(models.Model):
    attraction = models.ForeignKey(
        Attraction, on_delete=models.CASCADE, related_name="visitor_logs"
    )
    log_date = models.DateField()

    male_this_municipality = models.PositiveIntegerField(default=0)
    female_this_municipality = models.PositiveIntegerField(default=0)
    male_this_province = models.PositiveIntegerField(default=0)
    female_this_province = models.PositiveIntegerField(default=0)
    male_other_province = models.PositiveIntegerField(default=0)
    female_other_province = models.PositiveIntegerField(default=0)
    male_foreign = models.PositiveIntegerField(default=0)
    female_foreign = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ("attraction", "log_date")
        ordering = ["log_date"]

    @property
    def grand_total(self):
        return sum(
            [
                self.male_this_municipality,
                self.female_this_municipality,
                self.male_this_province,
                self.female_this_province,
                self.male_other_province,
                self.female_other_province,
                self.male_foreign,
                self.female_foreign,
            ]
        )

    def __str__(self):
        return f"{self.attraction} - {self.log_date}"


class Report(models.Model):
    resort = models.ForeignKey(Resort, on_delete=models.CASCADE, related_name="reports")
    month = models.PositiveSmallIntegerField()
    year = models.PositiveIntegerField()
    guest_count = models.PositiveIntegerField(default=0)
    revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(
        max_length=20,
        choices=[("draft", "Draft"), ("submitted", "Submitted")],
        default="draft",
    )

    class Meta:
        unique_together = ("resort", "month", "year")

    def __str__(self):
        return f"{self.resort.name} - {self.month}/{self.year}"


class TourismProgram(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    date_posted = models.DateField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[("active", "Active"), ("archived", "Archived")],
        default="active",
    )
    # Who receives it: every resort (default, also what existing programs were),
    # or only the resorts picked in `recipients`.
    send_to_all = models.BooleanField(default=True)
    recipients = models.ManyToManyField(
        Resort, blank=True, related_name="programs_received"
    )

    def __str__(self):
        return self.title

    @classmethod
    def visible_to(cls, resort):
        """Active programs a given resort should see: the ones sent to everyone,
        plus the ones sent specifically to that resort."""
        cond = Q(send_to_all=True)
        if resort is not None:
            cond |= Q(recipients=resort)
        return cls.objects.filter(status="active").filter(cond).distinct().order_by("-date_posted", "-id")


def resort_month_totals(resort, year, month):
    import calendar

    qs = RoomDailyLog.objects.filter(
        room__resort=resort, log_date__year=year, log_date__month=month, is_archived=False
    )
    totals = qs.aggregate(
        total_checked_in=Sum("guests_checked_in"),
        total_overnight=Sum("guests_overnight"),
        total_rooms_occupied=Count("id", filter=Q(rooms_occupied=True))
    )
    checked_in = totals["total_checked_in"] or 0
    overnight = totals["total_overnight"] or 0
    rooms_occupied = totals["total_rooms_occupied"] or 0
    days = calendar.monthrange(year, month)[1]
    available = resort.rooms_list.filter(is_archived=False).count() * days

    return {
        "total_checked_in": checked_in,
        "total_overnight": overnight,
        "total_rooms_occupied": rooms_occupied,
        "avg_guest_night": round(overnight / checked_in, 2) if checked_in else 0,
        "avg_occupancy_rate": round(100 * rooms_occupied / available, 1) if available else 0,
        "avg_guest_per_room": round(overnight / rooms_occupied, 2) if rooms_occupied else 0,
    }



class ActivityLog(models.Model):
    user = models.ForeignKey(
        SystemUser, on_delete=models.SET_NULL, null=True, related_name="activity_logs"
    )
    action = models.CharField(max_length=255)
    detail = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user} - {self.action} ({self.created_at:%Y-%m-%d %H:%M})"


def log_activity(user, action, detail=""):
    ActivityLog.objects.create(user=user, action=action, detail=detail)
    
# Add this to the END of core/models.py (after ActivityLog / log_activity).

class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} <{self.email}> - {self.created_at:%Y-%m-%d %H:%M}"


class Destination(models.Model):
    """MTO-curated places of interest (beaches, dive sites, churches, eateries...).

    This is what Tourist Bot reads to talk about attractions. Anything left blank is
    treated as "not posted": the bot says so and points to the MTO instead of guessing.
    Separate from `Attraction`, which belongs to a resort and feeds the visitor logs.
    """

    CATEGORY_CHOICES = [
        ("beach", "Beach"),
        ("diving", "Diving & marine"),
        ("heritage", "Heritage & culture"),
        ("food", "Food & eats"),
        ("nature", "Nature & scenic"),
        ("event", "Event / festival"),
        ("other", "Other"),
    ]

    name = models.CharField(max_length=150)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="other")
    description = models.TextField(blank=True, help_text="1-3 sentences visitors will read.")
    description_tl = models.TextField(blank=True, verbose_name="Description (Tagalog)")
    best_time = models.CharField(max_length=150, blank=True, help_text="e.g. Early morning, or November to May")
    entrance_fee = models.CharField(max_length=100, blank=True, help_text="e.g. Free, or PHP 50 per person")
    opening_hours = models.CharField(max_length=150, blank=True, help_text="e.g. Daily, 6:00 AM to 6:00 PM")
    activities = models.CharField(max_length=255, blank=True, help_text="Comma-separated, e.g. swimming, sunset viewing, photography")
    good_for = models.CharField(
        max_length=150, blank=True,
        help_text="Comma-separated: family, friends, couple, solo, divers, kids, seniors",
    )
    tips = models.TextField(blank=True, help_text="What to bring, safety, dress code, etc.")
    photo_url = models.URLField(max_length=500, blank=True)
    map_query = models.CharField(
        max_length=200, blank=True,
        help_text="Optional. What to search on Google Maps. Leave blank to use the name + Bauan, Batangas.",
    )
    status = models.CharField(
        max_length=20, choices=[("active", "Active"), ("inactive", "Hidden")], default="active"
    )
    sort_order = models.PositiveIntegerField(default=0, help_text="Lower numbers are listed first.")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "name"]

    def __str__(self):
        return self.name

    def tag_list(self, field):
        return [t.strip() for t in (getattr(self, field) or "").split(",") if t.strip()]


class BotQuestion(models.Model):
    """Questions Tourist Bot could not answer well, so the MTO can see what visitors want.
    Only the (masked) question text is stored: no IP address, no account, no location."""

    question = models.CharField(max_length=255)
    key = models.CharField(max_length=255, unique=True)
    lang = models.CharField(max_length=5, default="en")
    reason = models.CharField(max_length=80, blank=True)
    count = models.PositiveIntegerField(default=1)
    first_asked = models.DateTimeField(auto_now_add=True)
    last_asked = models.DateTimeField(auto_now=True)
    resolved = models.BooleanField(default=False)

    class Meta:
        ordering = ["resolved", "-count", "-last_asked"]

    def __str__(self):
        return self.question

    MAX_ROWS = 2000     # stops spam from filling the table; known questions still count up

    @property
    def reason_label(self):
        r = self.reason or ""
        if r.startswith("missing:"):
            parts = r.split(":", 2)
            what = {
                "fee": "entrance fee", "hours": "opening hours", "best_time": "best time to visit",
                "tips": "tips", "activities": "things to do", "good_for": "who it suits",
                "rates": "prices and rates", "food": "places to eat",
            }.get(parts[1], parts[1])
            return f"Info not posted: {what}" + (f" ({parts[2]})" if len(parts) > 2 and parts[2] else "")
        return {"no_match": "Bot didn't understand", "unclear": "Mentioned Bauan, but unclear what they want"}.get(r, "Bot couldn't answer")

    @classmethod
    def log(cls, text, lang="en", reason=""):
        """Record a question the bot couldn't answer. Masks phone numbers, emails and links first."""
        import re
        from django.db.models import F

        clean = re.sub(r"https?://\S+|www\.\S+", "[link]", text or "")
        clean = re.sub(r"[\w.+-]+@[\w-]+\.[\w.]+", "[email]", clean)
        clean = re.sub(r"\d[\d\s().-]{5,}\d", "[number]", clean)
        clean = re.sub(r"\s+", " ", clean).strip()[:250]
        if len(clean) < 2:
            return
        key = clean.lower()[:250]
        updated = cls.objects.filter(key=key).update(count=F("count") + 1, resolved=False, reason=reason[:80])
        if updated or cls.objects.count() >= cls.MAX_ROWS:
            return
        cls.objects.create(question=clean, key=key, lang=lang if lang in ("en", "tl") else "en", reason=reason[:80])