import calendar
import json
from collections import defaultdict
from datetime import date
from urllib.parse import quote_plus

import openpyxl
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side

from django.conf import settings
from django.contrib import messages
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.views import PasswordResetDoneView
from django.core.cache import cache
from django.core.mail import send_mail
from django.db.models import Count, Q, Sum
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse_lazy
from django.utils.crypto import get_random_string
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .forms import (
    AttractionForm,
    AttractionVisitorLogForm,
    DestinationForm,
    LoginForm,
    RegisterForm,
    ResortAdminForm,
    ResortDetailsForm,
    RoomAdminForm,
    RoomDailyLogFormSet,
    RoomForm,
    TourismProgramForm,
    UserPasswordForm,
    UserProfileForm,
)
from .models import (
    Attraction,
    AttractionVisitorLog,
    BotQuestion,
    ContactMessage,
    Destination,
    Report,
    Resort,
    Room,
    RoomDailyLog,
    SystemUser,
    TourismProgram,
    log_activity,
    resort_month_totals,
)


def role_required(*roles):
    return user_passes_test(lambda u: u.is_authenticated and u.role in roles)


def landing_view(request):
    return render(request, "public_home.html")


def get_started_view(request):
    """Staff/resort-owner onboarding page (formerly landing.html) — now
    linked from the public site's footer instead of living at the root URL."""
    return render(request, "get_started.html")


def api_resorts(request):
    """Public, no-login JSON feed of active resorts for the public site
    (GPS Guide dropdown, chatbot resort recognition, and the Travel Guide's
    "All resorts & nearby attractions" directory). Built from address/barangay
    text (no stored lat/lng yet), so Maps links use a text search/destination
    instead of precise coordinates."""
    resorts = (
        Resort.objects.filter(status="active")
        .annotate(room_count=Count("rooms_list", filter=Q(rooms_list__is_archived=False), distinct=True))
        .prefetch_related("attractions")
        .order_by("name")
    )
    data = []
    for r in resorts:
        location_bits = [r.name, r.barangay, "Bauan, Batangas, Philippines"]
        if r.address:
            location_bits.insert(1, r.address)
        maps_query = quote_plus(", ".join(filter(None, location_bits)))
        data.append({
            "id": r.id,
            "name": r.name,
            "barangay": r.barangay,
            "address": r.address,
            "maps_query": maps_query,
            "rooms": r.room_count,
            "attractions": [
                {"name": a.name, "type": a.attraction_type, "type_label": a.get_attraction_type_display()}
                for a in r.attractions.all()
                if a.status == "active"
            ],
        })
    return JsonResponse(data, safe=False)

@csrf_exempt
@require_POST
def api_contact(request):
    """Public contact form endpoint (no login required). Saves the message
    to ContactMessage and rate-limits to 5 submissions per IP per 15 min.
    csrf_exempt is safe here: this is a public anonymous JSON API, not a
    session-authenticated form, and it only ever creates a row — it can't
    read or modify anything belonging to a logged-in user."""
    ip = request.META.get("REMOTE_ADDR", "unknown")
    cache_key = f"contact_rate_{ip}"
    count = cache.get(cache_key, 0)
    if count >= 5:
        return JsonResponse(
            {"error": "Too many messages sent. Please try again later."}, status=429
        )

    try:
        payload = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid request."}, status=400)

    name = (payload.get("name") or "").strip()
    email = (payload.get("email") or "").strip()
    subject = (payload.get("subject") or "").strip()
    message = (payload.get("message") or "").strip()

    if not name or not email or not message:
        return JsonResponse({"error": "Name, email, and message are required."}, status=400)
    if "@" not in email or "." not in email.split("@")[-1]:
        return JsonResponse({"error": "Please enter a valid email address."}, status=400)

    ContactMessage.objects.create(name=name, email=email, subject=subject, message=message)
    cache.set(cache_key, count + 1, timeout=900)  # 15 minutes

    return JsonResponse({"success": True})


def login_view(request):
    if request.method == "POST":
        terms_ok = request.POST.get("agree_terms") == "on"
        if not terms_ok:
            # Server-side check: the button is disabled in the browser, but never trust that alone.
            form = LoginForm(request, initial={"username": request.POST.get("username", "")})
            return render(request, "login.html", {"form": form, "terms_error": True})
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            if user.status != "approved" and not user.is_superuser:
                form.add_error(None, "Your account is pending admin approval.")
            else:
                auth_login(request, user)
                log_activity(user, "logged in")
                return redirect("dashboard")
        return render(request, "login.html", {"form": form, "terms_checked": True})
    form = LoginForm()
    return render(request, "login.html", {"form": form})


def logout_view(request):
    auth_logout(request)
    return redirect("login")


def register_view(request):
    if request.method == "POST":
        if request.POST.get("agree_terms") != "on":
            return render(request, "register.html", {"form": RegisterForm(request.POST), "terms_error": True})
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, "register.html", {"form": RegisterForm(), "submitted": True})
        return render(request, "register.html", {"form": form, "terms_checked": True})
    form = RegisterForm()
    return render(request, "register.html", {"form": form})


def forgot_password_view(request):
    """Step 1: user enters their email/username; we generate a reset link and
    send it via email (or display it on screen when DEBUG is on, for testing)."""
    if request.method == "POST":
        email = (request.POST.get("email") or "").strip()
        username = (request.POST.get("username") or "").strip()
        user = None
        if email:
            user = SystemUser.objects.filter(email=email).first()
        if not user and username:
            user = SystemUser.objects.filter(username=username).first()
        if user:
            token = default_token_generator.make_token(user)
            uidb64 = force_bytes(user.pk)
            from urllib.parse import quote as urlquote
            uid = urlquote(uidb64.decode())
            reset_url = request.build_absolute_uri(f"/reset/{uid}/{token}/")
            subject = "Password reset request — Bauan Tourism Portal"
            body = (
                f"Hello {user.username},\n\n"
                f"We received a request to reset your password for the Bauan Tourism Portal.\n\n"
                f"Click the link below to choose a new password:\n{reset_url}\n\n"
                f"If you did not request this, you can ignore this email.\n\n"
                f"— Municipal Tourism Office, Bauan, Batangas"
            )
            try:
                send_mail(subject, body, settings.DEFAULT_FROM_EMAIL, [user.email], fail_silently=False)
            except Exception:
                pass
            log_activity(user, "requested password reset")
            return render(request, "forgot_password.html", {"sent": True, "email": email or username})
        else:
            return render(request, "forgot_password.html", {"error": "No account found with that email or username.", "email": email or username})
    return render(request, "forgot_password.html")


def reset_password_view(request, uidb64, token):
    """Step 2: the link from the email lands here. If the token is valid, show
    the new-password form; otherwise show an error."""
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = SystemUser.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, SystemUser.DoesNotExist):
        user = None

    valid = user is not None and default_token_generator.check_token(user, token)

    if request.method == "POST":
        new_password1 = request.POST.get("new_password1", "")
        new_password2 = request.POST.get("new_password2", "")
        if not valid:
            return render(request, "reset_password.html", {"valid": False})
        if new_password1 != new_password2:
            return render(request, "reset_password.html", {"valid": True, "error": "The two passwords do not match."})
        user.set_password(new_password1)
        user.save()
        log_activity(user, "reset password")
        messages.success(request, "Your password has been reset. You can now log in with the new password.")
        return redirect("login")

    return render(request, "reset_password.html", {"valid": valid, "uidb64": uidb64, "token": token})


@login_required
def dashboard(request):
    from datetime import timedelta
    from django.utils import timezone

    from .models import ActivityLog, SystemUser

    today = date.today()

    if request.user.role == "admin":
        stats = {
            "pending": SystemUser.objects.filter(status="pending").count(),
            "users": SystemUser.objects.filter(status="approved").exclude(role="admin").count(),
            "resorts": Resort.objects.filter(status="active").count(),
            "rooms": Room.objects.filter(is_archived=False).count(),
        }
        activity = ActivityLog.objects.select_related("user")[:6]
        return render(request, "dashboard_admin.html", {"stats": stats, "activity": activity})

    if request.user.role == "mto":
        year_logs = RoomDailyLog.objects.filter(log_date__year=today.year, is_archived=False).aggregate(
            checked_in=Sum("guests_checked_in"), nights=Sum("guests_overnight")
        )
        stats = {
            "resorts": Resort.objects.filter(status="active").count(),
            "checked_in": year_logs["checked_in"] or 0,
            "nights": year_logs["nights"] or 0,
            "messages": ContactMessage.objects.filter(created_at__gte=timezone.now() - timedelta(days=30)).count(),
        }
        return render(
            request,
            "dashboard_mto.html",
            {"stats": stats, "latest_messages": ContactMessage.objects.all()[:4]},
        )

    resort = request.user.resort
    stats = None
    if resort:
        totals = resort_month_totals(resort, today.year, today.month)
        today_agg = RoomDailyLog.objects.filter(
            room__resort=resort, room__is_archived=False, log_date=today, is_archived=False
        ).aggregate(
            checked_in=Sum("guests_checked_in"),
            nights=Sum("guests_overnight"),
            occupied=Count("id", filter=Q(rooms_occupied=True)),
        )
        stats = {
            "rooms": resort.rooms_list.filter(is_archived=False).count(),
            "today_checked_in": today_agg["checked_in"] or 0,
            "month_guest_nights": totals["total_overnight"],
            "month_occupancy": totals["avg_occupancy_rate"],
            "logged_today": bool(today_agg["checked_in"] or today_agg["nights"] or today_agg["occupied"]),
        }
    programs = TourismProgram.visible_to(resort)[:3]
    return render(request, "dashboard_resort.html", {"resort": resort, "stats": stats, "programs": programs})

# ---------------------------------------------------------------------------
# RESORT STAFF: daily accommodation log (DAE-1A), one row per room, one date
# ---------------------------------------------------------------------------
@login_required
@role_required("resort")
def resort_daily_log(request):
    resort = request.user.resort
    log_date = request.GET.get("date") or date.today().isoformat()

    rooms = Room.objects.filter(resort=resort)
    for room in rooms:
        RoomDailyLog.objects.get_or_create(room=room, log_date=log_date)

    queryset = RoomDailyLog.objects.filter(room__resort=resort, log_date=log_date)
    # An archived day stays archived for every room (including rooms added later).
    day_archived = queryset.filter(is_archived=True).exists()
    if day_archived:
        queryset.filter(is_archived=False).update(is_archived=True)

    if request.method == "POST" and not day_archived:
        formset = RoomDailyLogFormSet(request.POST, queryset=queryset)
        if formset.is_valid():
            formset.save()
            log_activity(request.user, "updated daily log")
            return redirect(f"{request.path}?date={log_date}")
    else:
        formset = RoomDailyLogFormSet(queryset=queryset)

    year, month = map(int, log_date.split("-")[:2])
    totals = resort_month_totals(resort, year, month)
    archived_days = list(
        RoomDailyLog.objects.filter(
            room__resort=resort, log_date__year=year, log_date__month=month, is_archived=True
        ).values_list("log_date", flat=True).distinct().order_by("log_date")
    )

    return render(
        request,
        "resort_daily_log.html",
        {
            "resort": resort, "formset": formset, "log_date": log_date, "totals": totals,
            "day_archived": day_archived, "archived_days": archived_days,
        },
    )


@login_required
@role_required("resort")
@require_POST
def resort_daily_log_action(request):
    """Archive, restore or permanently delete ONE day of this resort's daily log."""
    from django.urls import reverse

    action = request.POST.get("action")
    log_date = request.POST.get("date") or ""
    try:
        date.fromisoformat(log_date)
    except ValueError:
        return redirect("resort_daily_log")

    day_logs = RoomDailyLog.objects.filter(room__resort=request.user.resort, log_date=log_date)
    if action == "archive":
        day_logs.update(is_archived=True)
        log_activity(request.user, "archived daily log", log_date)
    elif action == "restore":
        day_logs.update(is_archived=False)
        log_activity(request.user, "restored daily log", log_date)
    elif action == "delete":
        day_logs.delete()
        log_activity(request.user, "deleted daily log", log_date)

    return redirect(f"{reverse('resort_daily_log')}?date={log_date}")

# ---------------------------------------------------------------------------
# RESORT STAFF: attraction visitor log (VAR-1)
# ---------------------------------------------------------------------------
@login_required
@role_required("resort")
def attraction_visitor_log(request, attraction_id):
    attraction = get_object_or_404(Attraction, id=attraction_id, resort=request.user.resort)
    log_date = request.GET.get("date") or date.today().isoformat()

    instance, _ = AttractionVisitorLog.objects.get_or_create(
        attraction=attraction, log_date=log_date
    )

    if request.method == "POST":
        form = AttractionVisitorLogForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            log_activity(request.user, "updated attraction visitor log")
            return redirect(f"{request.path}?date={log_date}")
    else:
        form = AttractionVisitorLogForm(instance=instance)

    month_qs = AttractionVisitorLog.objects.filter(
        attraction=attraction,
        log_date__year=instance.log_date.year,
        log_date__month=instance.log_date.month,
    )
    month_total = sum(row.grand_total for row in month_qs)

    return render(
        request,
        "attraction_visitor_log.html",
        {"attraction": attraction, "form": form, "log_date": log_date, "month_total": month_total},
    )


@login_required
@role_required("resort")
def resort_attractions(request):
    attractions = Attraction.objects.filter(resort=request.user.resort).exclude(status="archived")
    return render(request, "resort_attractions.html", {"attractions": attractions})


@login_required
@role_required("resort")
@require_POST
def attraction_archive(request, attraction_id):
    """Hide one of this resort's attractions. It moves to the Recycle Bin and can be restored."""
    attraction = get_object_or_404(Attraction, id=attraction_id, resort=request.user.resort)
    attraction.status = "archived"
    attraction.save(update_fields=["status"])
    log_activity(request.user, "Archived attraction", f"{attraction.name} - {attraction.resort.name}")
    return redirect("resort_attractions")

# ---------------------------------------------------------------------------
# RESORT STAFF: view MTO programs, edit resort details, manage rooms
# ---------------------------------------------------------------------------
@login_required
@role_required("resort")
def view_programs(request):
    resort = request.user.resort
    programs = TourismProgram.visible_to(resort).prefetch_related("recipients")
    return render(request, "view_programs.html", {"programs": programs, "my_resort": resort})


@login_required
@role_required("resort")
def edit_resort_details(request):
    resort = request.user.resort
    if request.method == "POST":
        form = ResortDetailsForm(request.POST, instance=resort)
        if form.is_valid():
            form.save()
            log_activity(request.user, "updated resort details")
            return redirect("edit_resort_details")
    else:
        form = ResortDetailsForm(instance=resort)
    return render(request, "resort_details.html", {"form": form, "resort": resort})


@login_required
@role_required("resort")
def manage_rooms(request):
    resort = request.user.resort
    if request.method == "POST":
        if "archive_room_id" in request.POST:
            room = Room.objects.filter(id=request.POST["archive_room_id"], resort=resort).first()
            if room:
                room.is_archived = True
                room.save()
                log_activity(request.user, "Archived room", f"Room {room.room_number} - {resort.name}")
        elif "restore_room_id" in request.POST:
            room = Room.objects.filter(id=request.POST["restore_room_id"], resort=resort).first()
            if room:
                room.is_archived = False
                room.save()
                log_activity(request.user, "Restored room", f"Room {room.room_number} - {resort.name}")
        elif "delete_room_id" in request.POST:
            room = Room.objects.filter(id=request.POST["delete_room_id"], resort=resort).first()
            if room:
                room.delete()
                log_activity(request.user, "Deleted room", f"Room {room.room_number} - {resort.name}")
        else:
            form = RoomForm(request.POST)
            if form.is_valid():
                room = form.save(commit=False)
                room.resort = resort
                room.save()
                log_activity(request.user, "Added room", f"Room {room.room_number} - {resort.name}")
        return redirect("manage_rooms")
    form = RoomForm()
    rooms = Room.objects.filter(resort=resort, is_archived=False)
    archived_rooms = Room.objects.filter(resort=resort, is_archived=True)
    return render(
        request,
        "manage_rooms.html",
        {"form": form, "rooms": rooms, "archived_rooms": archived_rooms, "resort": resort},
    )


def terms_view(request):
    return render(request, "terms.html")


# ---------------------------------------------------------------------------
# MTO STAFF: consolidated annual overview across all resorts, with drilldown
# ---------------------------------------------------------------------------

ARRIVAL_COLS = 19   # 12 residence (4 groups x M/F/Total) + 3 grand total + 4 overnight


def _tourist_arrival_matrix(year, resort=None, attraction_type="", source="attractions"):
    """The 12 months x 19 columns of the DOT 'Tourist Arrival' form.

    source="attractions"   -> Male/Female per place of residence come from the attraction visitor logs.
    source="accommodation" -> residence is only recorded as totals in the daily room log (no sex split),
                              so Male/Female per residence are None ("-") and only Total is filled.
    Overnight columns always come from the (non-archived) daily room logs.
    """
    rooms = RoomDailyLog.objects.filter(log_date__year=year, is_archived=False)
    visits = AttractionVisitorLog.objects.filter(log_date__year=year).exclude(attraction__status="archived")
    if resort:
        rooms = rooms.filter(room__resort=resort)
        visits = visits.filter(attraction__resort=resort)
    if attraction_type:
        visits = visits.filter(attraction__attraction_type=attraction_type)

    rows = []
    for month in range(1, 13):
        r = rooms.filter(log_date__month=month).aggregate(
            checked=Sum("guests_checked_in"), nights=Sum("guests_overnight"), occupied=Count("id", filter=Q(rooms_occupied=True)),
            foreign=Sum("foreign_country"), male=Sum("male"), female=Sum("female"),
            mun=Sum("this_municipality"), prov=Sum("this_province"), other=Sum("other_province"),
        )
        r = {k: v or 0 for k, v in r.items()}

        if source == "accommodation":
            residence = [None, None, r["mun"], None, None, r["prov"], None, None, r["other"], None, None, r["foreign"]]
            grand = [r["male"], r["female"], r["male"] + r["female"]]
        else:
            v = visits.filter(log_date__month=month).aggregate(
                mun_m=Sum("male_this_municipality"), mun_f=Sum("female_this_municipality"),
                prov_m=Sum("male_this_province"), prov_f=Sum("female_this_province"),
                oth_m=Sum("male_other_province"), oth_f=Sum("female_other_province"),
                for_m=Sum("male_foreign"), for_f=Sum("female_foreign"),
            )
            v = {k: x or 0 for k, x in v.items()}
            residence, male, female = [], 0, 0
            for g in ("mun", "prov", "oth", "for"):
                m_, f_ = v[g + "_m"], v[g + "_f"]
                residence += [m_, f_, m_ + f_]
                male, female = male + m_, female + f_
            grand = [male, female, male + female]

        cells = residence + grand + [r["checked"], r["nights"], r["occupied"], r["foreign"]]
        rows.append({
            "month_name": calendar.month_name[month],
            "cells": cells,
            "empty": not any(c for c in cells if c),
        })

    total_cells = [
        None if all(row["cells"][i] is None for row in rows) else sum(row["cells"][i] or 0 for row in rows)
        for i in range(ARRIVAL_COLS)
    ]
    return rows, total_cells


def _arrival_context(request):
    """Filters + data shared by the on-screen page, the printable sheet and the Excel export."""
    try:
        year = int(request.GET.get("year", date.today().year))
    except ValueError:
        year = date.today().year
    resort_id = request.GET.get("resort", "")
    q = request.GET.get("q", "").strip()
    resort = None
    if q:
        resort = Resort.objects.filter(name__icontains=q).first()
        if resort:
            resort_id = str(resort.id)
    if not resort and resort_id.isdigit():
        resort = Resort.objects.filter(id=int(resort_id)).first()
    types = dict(Attraction.ATTRACTION_TYPES)
    attraction_type = request.GET.get("type", "")
    if attraction_type not in types:
        attraction_type = ""
    source = "accommodation" if request.GET.get("source") == "accommodation" else "attractions"

    rows, total_cells = _tourist_arrival_matrix(year, resort, attraction_type, source)
    if source == "accommodation":
        type_label = "Accommodation"
    else:
        type_label = types.get(attraction_type, "All types")
    return {
        "year": year,
        "resorts": Resort.objects.order_by("name"),
        "selected_resort": resort,
        "selected_resort_id": resort.id if resort else None,
        "search_q": q,
        "attraction_type": attraction_type,
        "type_choices": Attraction.ATTRACTION_TYPES,
        "type_label": type_label,
        "source": source,
        "establishment": resort.name if resort else "All establishments (municipality-wide)",
        "barangay": resort.barangay if resort else "All barangays",
        "rows": rows,
        "total_cells": total_cells,
    }

@login_required
@role_required("mto", "admin")
def add_attraction(request):
    if request.method == "POST":
        form = AttractionForm(request.POST)
        if form.is_valid():
            form.save()
            log_activity(request.user, "added attraction", f"Attraction: {form.cleaned_data['name']}")
            return redirect("mto_annual_summary")
    else:
        form = AttractionForm()
    return render(request, "add_attraction.html", {"form": form})


@login_required
@role_required("mto", "admin")
def manage_programs(request):
    if request.method == "POST":
        form = TourismProgramForm(request.POST)
        if form.is_valid():
            program = form.save()
            if program.send_to_all:
                audience = "all resort staff"
            else:
                names = ", ".join(r.name for r in program.recipients.order_by("name"))
                audience = f"{program.recipients.count()} resort(s): {names}"
            log_activity(request.user, "added tourism program", f"Program: {program.title} -> {audience}")
            messages.success(request, f"Program '{program.title}' sent to {audience}.")
            return redirect("manage_programs")
    else:
        form = TourismProgramForm()
    programs = TourismProgram.objects.all().prefetch_related("recipients").order_by("-date_posted", "-id")
    return render(request, "manage_programs.html", {"form": form, "programs": programs})


# ---------------------------------------------------------------------------
# ADMIN: user approval, contact inbox, activity log
# ---------------------------------------------------------------------------
@login_required
@role_required("admin")
def manage_users(request):
    from .models import SystemUser

    users = SystemUser.objects.all().order_by("status", "username")
    if request.method == "POST":
        user_id = request.POST.get("user_id")
        action = request.POST.get("action")
        target = get_object_or_404(SystemUser, id=user_id)
        if action == "approve":
            target.status = "approved"
            target.save(update_fields=["status"])
            log_activity(request.user, "Approved user", target.username)
            messages.success(request, f"{target.username} is now approved.")
        elif action == "disable":
            if target.id == request.user.id:
                messages.error(request, "You can't disable your own account.")
            else:
                target.status = "disabled"
                target.save(update_fields=["status"])
                log_activity(request.user, "Disabled user", target.username)
                messages.success(request, f"{target.username} has been disabled.")
        elif action == "delete":
            if target.id == request.user.id:
                messages.error(request, "You can't delete your own account.")
            elif target.role == "admin" and SystemUser.objects.filter(role="admin").count() <= 1:
                messages.error(request, "You can't delete the last admin account.")
            else:
                name = target.username
                detail = f"{name} ({target.get_role_display()}, {target.resort.name if target.resort else '-'})"
                target.delete()
                log_activity(request.user, "Deleted user", detail)
                messages.success(request, f"User '{name}' was deleted.")
        elif action == "reset_password":
            new_password = request.POST.get("new_password", "")
            confirm = request.POST.get("confirm_password", "")
            if new_password and new_password == confirm:
                target.set_password(new_password)
                target.save()
                log_activity(request.user, "Reset password for user", target.username)
                messages.success(request, f"Password reset for {target.username}.")
            else:
                messages.error(request, "Passwords did not match or were empty.")
        elif action == "change_username":
            new_username = request.POST.get("new_username", "").strip()
            if new_username and not SystemUser.objects.filter(username=new_username).exclude(id=target.id).exists():
                old = target.username
                target.username = new_username
                target.save()
                log_activity(request.user, "Changed username", f"{old} -> {new_username}")
                messages.success(request, f"Username changed from {old} to {new_username}.")
            else:
                messages.error(request, "Username is already taken or was empty.")
        return redirect("manage_users")
    return render(request, "manage_users.html", {"users": users})


@login_required
@role_required("admin")
def user_profile(request, user_id):
    """Admin can view and edit any user's username and reset their password."""
    from .forms import UserProfileForm, UserPasswordForm
    from .models import SystemUser

    target = get_object_or_404(SystemUser, id=user_id)
    if request.method == "POST":
        if "save_profile" in request.POST:
            form = UserProfileForm(request.POST, instance=target)
            if form.is_valid():
                form.save()
                log_activity(request.user, "Updated user profile", target.username)
                messages.success(request, "Profile updated.")
                return redirect("user_profile", user_id=target.id)
        elif "save_password" in request.POST:
            form = UserPasswordForm(request.POST)
            if form.is_valid():
                target.set_password(form.cleaned_data["new_password1"])
                target.save()
                log_activity(request.user, "Reset password for user", target.username)
                messages.success(request, "Password updated.")
                return redirect("user_profile", user_id=target.id)
    else:
        profile_form = UserProfileForm(instance=target)
        password_form = UserPasswordForm()
    return render(
        request,
        "user_profile.html",
        {"target": target, "profile_form": profile_form, "password_form": password_form},
    )


@login_required
def my_profile(request):
    """Self-service profile: change own username and password."""
    from .forms import UserProfileForm, UserPasswordForm

    user = request.user
    if request.method == "POST":
        if "save_profile" in request.POST:
            form = UserProfileForm(request.POST, instance=user)
            if form.is_valid():
                form.save()
                log_activity(user, "Updated own profile")
                messages.success(request, "Profile updated.")
                return redirect("my_profile")
        elif "save_password" in request.POST:
            form = UserPasswordForm(request.POST)
            if form.is_valid():
                user.set_password(form.cleaned_data["new_password1"])
                user.save()
                log_activity(user, "Changed own password")
                messages.success(request, "Password updated. Please log in again.")
                return redirect("logout")
    else:
        profile_form = UserProfileForm(instance=user)
        password_form = UserPasswordForm()
    return render(
        request,
        "user_profile.html",
        {"target": user, "profile_form": profile_form, "password_form": password_form, "self": True},
    )


@login_required
@role_required("admin", "mto")
def contact_inbox(request):
    messages_list = ContactMessage.objects.all()[:200]
    return render(request, "contact_inbox.html", {"messages_list": messages_list})


@login_required
@role_required("admin")
def activity_log(request):
    from .models import ActivityLog

    logs = ActivityLog.objects.select_related("user")[:200]
    return render(request, "activity_log.html", {"logs": logs})


def _excel_response(wb, filename):
    response = HttpResponse(
        content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    response["Content-Disposition"] = f'attachment; filename="{filename}"'
    wb.save(response)
    return response


@login_required
@role_required("resort")
def export_daily_log(request):
    resort = request.user.resort
    year = int(request.GET.get("year", date.today().year))
    month = int(request.GET.get("month", date.today().month))

    logs = RoomDailyLog.objects.filter(
    room__resort=resort, log_date__year=year, log_date__month=month, is_archived=False
    ).select_related("room").order_by("log_date", "room__room_number")

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "DAE-1A"
    navy = PatternFill(start_color="0B3D4C", end_color="0B3D4C", fill_type="solid")
    white_bold = Font(bold=True, color="FFFFFF")

    ws.merge_cells("A1:K1")
    ws["A1"] = f"Monthly Recording Format for Accommodation Establishment — {resort.name} ({month}/{year})"
    ws["A1"].font = Font(bold=True, size=13)

    headers = ["Date", "Room No.", "Guests Check-in", "Guests Overnight", "Rooms Occupied",
               "Male", "Female", "This Municipality", "This Province", "Other Province", "Foreign", "Nationality"]
    for i, h in enumerate(headers, 1):
        c = ws.cell(row=3, column=i, value=h)
        c.font = white_bold
        c.fill = navy

    row = 4
    for log in logs:
        ws.cell(row=row, column=1, value=log.log_date.strftime("%Y-%m-%d"))
        ws.cell(row=row, column=2, value=log.room.room_number)
        ws.cell(row=row, column=3, value=log.guests_checked_in)
        ws.cell(row=row, column=4, value=log.guests_overnight)
        ws.cell(row=row, column=5, value="Yes" if log.rooms_occupied else "No")
        ws.cell(row=row, column=6, value=log.male)
        ws.cell(row=row, column=7, value=log.female)
        ws.cell(row=row, column=8, value=log.this_municipality)
        ws.cell(row=row, column=9, value=log.this_province)
        ws.cell(row=row, column=10, value=log.other_province)
        ws.cell(row=row, column=11, value=log.foreign_country)
        ws.cell(row=row, column=12, value=log.nationality)
        row += 1

    for i, w in enumerate([12, 10, 12, 12, 12, 8, 8, 14, 12, 12, 10, 14], 1):
        ws.column_dimensions[chr(64 + i)].width = w

    return _excel_response(wb, f"{resort.name}_DAE1A_{year}-{month:02d}.xlsx")


@login_required
@role_required("mto", "admin")
def export_mto_summary(request):
    ctx = _arrival_context(request)
    year = ctx["year"]
    col = openpyxl.utils.get_column_letter

    thin = Side(style="thin", color="555555")
    border = Border(left=thin, right=thin, top=thin, bottom=thin)
    yellow = PatternFill(start_color="FFFF00", end_color="FFFF00", fill_type="solid")
    blue = PatternFill(start_color="9DC3E6", end_color="9DC3E6", fill_type="solid")
    grey = PatternFill(start_color="D9D9D9", end_color="D9D9D9", fill_type="solid")
    center = Alignment(horizontal="center", vertical="center", wrap_text=True)

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Tourist Arrival"

    ws["A1"] = "Tourist Arrival"
    ws["A1"].font = Font(bold=True, size=13)
    ws["A2"] = "(This recording form can be used instead of just counting the visitors)"
    ws["A2"].font = Font(italic=True, size=9)
    for i, (label, value) in enumerate([
        ("Month/Year:", str(year)),
        ("Name of Establishment:", ctx["establishment"]),
        ("Barangay:", ctx["barangay"]),
        ("Type of Tourist Attraction:", ctx["type_label"]),
    ], start=3):
        ws.cell(row=i, column=1, value=label).font = Font(bold=True)
        ws.cell(row=i, column=3, value=value)

    def head(rng, text, fill):
        ws.merge_cells(rng)
        ws[rng.split(":")[0]].value = text
        ws[rng.split(":")[0]].font = Font(bold=True, size=9)
        ws[rng.split(":")[0]].alignment = center
        for row in ws[rng]:
            for c in row:
                c.fill = fill
                c.border = border

    top = 8   # header rows: top, top+1, top+2
    head(f"A{top}:A{top + 2}", f"Year\n{year}", yellow)
    head(f"B{top}:M{top}", "Place of Residence\nPhilippines", yellow)
    for n, name in enumerate(["This Municipality", "This Province", "Other Province", "Foreign Country Residence"]):
        start = 2 + n * 3
        head(f"{col(start)}{top + 1}:{col(start + 2)}{top + 1}", name, yellow)
    head(f"N{top}:P{top + 1}", "Grand Total Number of Visitors", yellow)
    head(f"Q{top}:T{top + 1}", "OVERNIGHT VISITOR ARRIVALS", yellow)

    sub = ["Male", "Female", "Total"] * 5 + [
        "Total Guest Checked-in", "Total Guest Night", "Total No. of Rooms Occupied", "Total Foreign Visitor Arrivals",
    ]
    for i, text in enumerate(sub):
        c = ws.cell(row=top + 2, column=2 + i, value=text)
        c.fill, c.border, c.alignment, c.font = blue, border, center, Font(bold=True, size=9)
    ws.row_dimensions[top + 2].height = 42

    def put_row(r, label, cells, fill=None, bold=False):
        first = ws.cell(row=r, column=1, value=label)
        first.border = border
        first.font = Font(bold=bold)
        if fill:
            first.fill = fill
        for i, v in enumerate(cells):
            c = ws.cell(row=r, column=2 + i, value="-" if v is None else v)
            c.border, c.alignment = border, Alignment(horizontal="center")
            c.font = Font(bold=bold)
            if fill:
                c.fill = fill

    for i, row in enumerate(ctx["rows"]):
        put_row(top + 3 + i, row["month_name"], row["cells"])
    put_row(top + 15, "Total of the Year", ctx["total_cells"], fill=grey, bold=True)

    ws.column_dimensions["A"].width = 20
    for i in range(2, 17):
        ws.column_dimensions[col(i)].width = 10
    for i in range(17, 21):
        ws.column_dimensions[col(i)].width = 16

    if ctx["source"] == "accommodation":
        ws.cell(row=top + 17, column=1, value=(
            "Place of Residence figures are totals from the resorts' daily logs (not recorded by sex); "
            "Grand Total Male/Female are the guests counted by sex."
        )).font = Font(italic=True, size=9)

    return _excel_response(wb, f"Tourist_Arrival_{year}.xlsx")
# ADD THIS TO THE END OF core/views.py
#
# Also change these two import lines near the top of core/views.py:
#   from django.db.models import Sum             ->  from django.db.models import Count, Q, Sum
#   (in the "from .forms import (...)" block, add:)  ResortAdminForm, RoomAdminForm,
# and make sure this line exists near the top (it should already, from the contact form):
#   from django.views.decorators.http import require_POST


# ---------------------------------------------------------------------------
# ADMIN: manage resorts / rooms / attractions inside the portal layout
# ---------------------------------------------------------------------------
@login_required
@role_required("admin")
def admin_resorts(request):
    q = request.GET.get("q", "").strip()
    resorts = Resort.objects.annotate(
        room_count=Count("rooms_list", filter=Q(rooms_list__is_archived=False))
    ).order_by("name")
    if q:
        resorts = resorts.filter(
            Q(name__icontains=q) | Q(barangay__icontains=q) | Q(owner_name__icontains=q)
        )
    return render(request, "admin_resorts.html", {"resorts": resorts, "q": q})


@login_required
@role_required("admin")
def resort_form(request, resort_id=None):
    resort = get_object_or_404(Resort, id=resort_id) if resort_id else None
    if request.method == "POST":
        form = ResortAdminForm(request.POST, instance=resort)
        if form.is_valid():
            saved = form.save()
            log_activity(request.user, "Updated resort" if resort else "Added resort", saved.name)
            return redirect("admin_resorts")
    else:
        form = ResortAdminForm(instance=resort)
    return render(
        request,
        "simple_form.html",
        {"form": form, "title": "Edit resort" if resort else "Add resort", "back_url": "admin_resorts"},
    )


@login_required
@role_required("admin")
@require_POST
def resort_toggle(request, resort_id):
    resort = get_object_or_404(Resort, id=resort_id)
    resort.status = "inactive" if resort.status == "active" else "active"
    resort.save()
    log_activity(
        request.user,
        "Deactivated resort" if resort.status == "inactive" else "Reactivated resort",
        resort.name,
    )
    return redirect("admin_resorts")


@login_required
@role_required("admin")
def admin_rooms(request):
    if request.method == "POST":
        if "archive_room_id" in request.POST or "restore_room_id" in request.POST:
            archiving = "archive_room_id" in request.POST
            room_id = request.POST.get("archive_room_id") or request.POST.get("restore_room_id")
            room = get_object_or_404(Room, id=room_id)
            room.is_archived = archiving
            room.save()
            log_activity(
                request.user,
                "Archived room" if archiving else "Restored room",
                f"Room {room.room_number} - {room.resort.name}",
            )
            return redirect(request.get_full_path())
        form = RoomAdminForm(request.POST)
        if form.is_valid():
            room = form.save()
            log_activity(request.user, "Added room", f"Room {room.room_number} - {room.resort.name}")
            return redirect("admin_rooms")
    else:
        form = RoomAdminForm()

    resort_id = request.GET.get("resort", "")
    show_archived = request.GET.get("archived") == "1"
    rooms = Room.objects.select_related("resort").filter(is_archived=show_archived)
    if resort_id.isdigit():
        rooms = rooms.filter(resort_id=int(resort_id))
    rooms = rooms.order_by("resort__name", "room_number")

    return render(
        request,
        "admin_rooms.html",
        {
            "rooms": rooms,
            "form": form,
            "resorts": Resort.objects.order_by("name"),
            "selected_resort_id": int(resort_id) if resort_id.isdigit() else None,
            "show_archived": show_archived,
        },
    )


@login_required
@role_required("admin")
def admin_attractions(request):
    if request.method == "POST":
        form = AttractionForm(request.POST)
        if form.is_valid():
            attraction = form.save()
            log_activity(request.user, "Added attraction", f"{attraction.name} - {attraction.resort.name}")
            return redirect("admin_attractions")
    else:
        form = AttractionForm()
    q = request.GET.get("q", "").strip()
    attractions = Attraction.objects.select_related("resort").order_by("resort__name", "name")
    if q:
        attractions = attractions.filter(Q(name__icontains=q) | Q(resort__name__icontains=q))
    return render(
        request,
        "admin_attractions.html",
        {"attractions": attractions, "form": form, "q": q},
    )


@login_required
@role_required("admin")
def attraction_edit(request, attraction_id):
    attraction = get_object_or_404(Attraction, id=attraction_id)
    if request.method == "POST":
        form = AttractionForm(request.POST, instance=attraction)
        if form.is_valid():
            form.save()
            log_activity(request.user, "Updated attraction", attraction.name)
            return redirect("admin_attractions")
    else:
        form = AttractionForm(instance=attraction)
    return render(
        request,
        "simple_form.html",
        {"form": form, "title": "Edit attraction", "back_url": "admin_attractions"},
    )


@login_required
@role_required("admin")
@require_POST
def attraction_toggle(request, attraction_id):
    attraction = get_object_or_404(Attraction, id=attraction_id)
    attraction.status = "inactive" if attraction.status == "active" else "active"
    attraction.save()
    log_activity(
        request.user,
        "Deactivated attraction" if attraction.status == "inactive" else "Reactivated attraction",
        attraction.name,
    )
    return redirect("admin_attractions")

MONTH_CHOICES = [(i, calendar.month_name[i]) for i in range(1, 13)]
VAR1_SUBHEADERS = ["Male", "Female", "Total"] * 5


def _year_month(request):
    today = date.today()
    try:
        year = int(request.GET.get("year", today.year))
        month = int(request.GET.get("month", today.month))
    except ValueError:
        year, month = today.year, today.month
    if not 1 <= month <= 12:
        month = today.month
    if not 2000 <= year <= 2100:
        year = today.year
    return year, month


def _build_resort_sheet(rooms, logs, year, month):
    """Turn one month of RoomDailyLog rows into the DAE-1A grid.
    Pure Python (no database access) so the arithmetic is easy to test."""
    days_in_month = calendar.monthrange(year, month)[1]
    logs_by_day = defaultdict(dict)
    for log in logs:
        logs_by_day[log.log_date.day][log.room_id] = log

    rows = []
    totals = {"checked": 0, "overnight": 0, "occupied": 0, "male": 0, "female": 0}
    for day in range(1, days_in_month + 1):
        day_logs = logs_by_day.get(day, {})
        checked = sum(l.guests_checked_in for l in day_logs.values())
        overnight = sum(l.guests_overnight for l in day_logs.values())
        occupied = sum(1 for l in day_logs.values() if l.rooms_occupied)
        male = sum(l.male for l in day_logs.values())
        female = sum(l.female for l in day_logs.values())
        has_data = any([checked, overnight, occupied, male, female])

        room_cells = []
        for room in rooms:
            cell = ""
            log = day_logs.get(room.id)
            if log is not None and log.rooms_occupied:
                cell = log.guests_overnight or "\u2713"
            room_cells.append(cell)

        row = {
            "day": day,
            "weekday": date(year, month, day).strftime("%a"),
            "has_data": has_data,
            "room_cells": room_cells,
        }
        if has_data:
            nationalities = sorted(
                {(l.nationality or "").strip() for l in day_logs.values() if (l.nationality or "").strip()}
            )
            row.update(
                checked=checked, overnight=overnight, occupied=occupied,
                male=male, female=female, nationality=", ".join(nationalities),
            )
            totals["checked"] += checked
            totals["overnight"] += overnight
            totals["occupied"] += occupied
            totals["male"] += male
            totals["female"] += female
        rows.append(row)

    room_totals = []
    for room in rooms:
        room_totals.append(
            sum(1 for d in logs_by_day.values() if room.id in d and d[room.id].rooms_occupied)
        )

    available = len(rooms) * days_in_month
    avg = {
        "guest_night": round(totals["overnight"] / totals["checked"], 2) if totals["checked"] else 0,
        "occupancy_rate": round(100 * totals["occupied"] / available, 1) if available else 0,
        "guests_per_room": round(totals["overnight"] / totals["occupied"], 2) if totals["occupied"] else 0,
    }
    return {"rows": rows, "room_totals": room_totals, "totals": totals, "avg": avg, "available": available}


def _build_attraction_sheet(logs, year, month):
    """Turn one month of AttractionVisitorLog rows into the VAR-1 grid (15 cells per row)."""
    days_in_month = calendar.monthrange(year, month)[1]
    by_day = {l.log_date.day: l for l in logs}
    rows = []
    total_cells = [0] * 15
    for day in range(1, days_in_month + 1):
        log = by_day.get(day)
        cells = [""] * 15
        if log is not None:
            pairs = [
                (log.male_this_municipality, log.female_this_municipality),
                (log.male_this_province, log.female_this_province),
                (log.male_other_province, log.female_other_province),
                (log.male_foreign, log.female_foreign),
            ]
            values = []
            gm = gf = 0
            for m, f in pairs:
                values += [m, f, m + f]
                gm += m
                gf += f
            values += [gm, gf, gm + gf]
            if values[-1] > 0:
                cells = values
                total_cells = [a + b for a, b in zip(total_cells, values)]
        rows.append({"day": day, "weekday": date(year, month, day).strftime("%a"), "cells": cells})
    return {"rows": rows, "total_cells": total_cells}


def _annual_cells(agg):
    """One month of aggregated numbers -> the 10 report columns."""
    male = agg.get("male") or 0
    female = agg.get("female") or 0
    return [
        agg.get("this_municipality") or 0,
        agg.get("this_province") or 0,
        agg.get("other_province") or 0,
        agg.get("foreign_country") or 0,
        male,
        female,
        male + female,
        agg.get("checked_in") or 0,
        agg.get("overnight") or 0,
        agg.get("rooms_occupied") or 0,
    ]


@login_required
@role_required("resort")
def resort_monthly_sheet(request):
    resort = request.user.resort
    year, month = _year_month(request)
    logs = list(
        RoomDailyLog.objects.filter(
            room__resort=resort, log_date__year=year, log_date__month=month, is_archived=False
        ).select_related("room")
    )
    with_logs = {log.room_id for log in logs}
    rooms = [
        r for r in Room.objects.filter(resort=resort).order_by("room_number")
        if not r.is_archived or r.id in with_logs
    ]
    sheet = _build_resort_sheet(rooms, logs, year, month)
    return render(
        request,
        "resort_monthly_sheet.html",
        {
            "resort": resort, "year": year, "month": month,
            "month_name": calendar.month_name[month], "months": MONTH_CHOICES,
            "rooms": rooms, "prepared_by": request.user.get_full_name() or request.user.username,
            **sheet,
        },
    )


@login_required
@role_required("resort")
def attraction_monthly_sheet(request, attraction_id):
    attraction = get_object_or_404(Attraction, id=attraction_id, resort=request.user.resort)
    year, month = _year_month(request)
    logs = list(
        AttractionVisitorLog.objects.filter(
            attraction=attraction, log_date__year=year, log_date__month=month
        )
    )
    sheet = _build_attraction_sheet(logs, year, month)
    return render(
        request,
        "attraction_monthly_sheet.html",
        {
            "attraction": attraction, "year": year, "month": month,
            "month_name": calendar.month_name[month], "months": MONTH_CHOICES,
            "subheaders": VAR1_SUBHEADERS,
            "prepared_by": request.user.get_full_name() or request.user.username,
            **sheet,
        },
    )


@login_required
@role_required("mto", "admin")
def mto_annual_summary(request):
    ctx = _arrival_context(request)
    return render(request, "mto_annual_summary.html", ctx)


@login_required
@role_required("mto", "admin")
def mto_annual_sheet(request):
    ctx = _arrival_context(request)
    ctx["resort_count"] = Resort.objects.filter(status="active").count()
    ctx["prepared_by"] = request.user.get_full_name() or request.user.username
    return render(request, "mto_annual_sheet.html", ctx)


@login_required
@require_POST
def program_toggle_archive(request, pk):
    if request.user.role not in ("admin", "mto"):
        return redirect("manage_programs")
    program = get_object_or_404(TourismProgram, pk=pk)
    program.status = "archived" if program.status == "active" else "active"
    program.save(update_fields=["status"])
    messages.success(request, f"Program '{program.title}' is now {program.status}.")
    return redirect("manage_programs")


@login_required
@require_POST
def program_delete(request, pk):
    if request.user.role not in ("admin", "mto"):
        return redirect("manage_programs")
    program = get_object_or_404(TourismProgram, pk=pk)
    program.delete()
    messages.success(request, "Program deleted.")
    return redirect("manage_programs")

# ---------------------------------------------------------------------------
# RECYCLE BIN: everything archived, in one place (resort staff = own resort; MTO/admin = all)
# ---------------------------------------------------------------------------
@login_required
@role_required("resort", "mto", "admin")
def recycle_bin(request):
    user = request.user
    own_only = user.role == "resort"

    rooms = Room.objects.filter(is_archived=True).select_related("resort")
    day_logs = RoomDailyLog.objects.filter(is_archived=True)
    attractions = Attraction.objects.filter(status="archived").select_related("resort").order_by("resort__name", "name")
    if own_only:
        rooms = rooms.filter(resort=user.resort)
        day_logs = day_logs.filter(room__resort=user.resort)
        attractions = attractions.filter(resort=user.resort)

    days = (
        day_logs.values("room__resort_id", "room__resort__name", "log_date")
        .annotate(entries=Count("id"), checked_in=Sum("guests_checked_in"), nights=Sum("guests_overnight"))
        .order_by("-log_date", "room__resort__name")
    )
    programs = [] if own_only else TourismProgram.objects.filter(status="archived").order_by("-date_posted")
    rooms = rooms.order_by("resort__name", "room_number")

    return render(
        request,
        "recycle_bin.html",
        {
            "days": days, "rooms": rooms, "attractions": attractions, "programs": programs, "show_resort": not own_only,
            "total": len(days) + rooms.count() + attractions.count() + len(programs),
        },
    )

@login_required
@role_required("resort", "mto", "admin")
@require_POST
def recycle_bin_action(request):
    """Restore or permanently delete one archived room, one archived day, or one archived program."""
    user = request.user
    kind = request.POST.get("kind")
    action = request.POST.get("action")
    if action not in ("restore", "delete"):
        return redirect("recycle_bin")

    if kind == "room":
        rooms = Room.objects.filter(id=request.POST.get("id") or 0, is_archived=True).select_related("resort")
        if user.role == "resort":
            rooms = rooms.filter(resort=user.resort)
        room = rooms.first()
        if room:
            label = f"Room {room.room_number} - {room.resort.name}"
            if action == "restore":
                room.is_archived = False
                room.save()
                log_activity(user, "Restored room", label)
            else:
                room.delete()   # its daily-log records are deleted with it
                log_activity(user, "Deleted room", label)

    elif kind == "day":
        resort_id = request.POST.get("resort_id", "")
        log_date = request.POST.get("date", "")
        try:
            date.fromisoformat(log_date)
        except ValueError:
            return redirect("recycle_bin")
        if resort_id.isdigit():
            logs = RoomDailyLog.objects.filter(is_archived=True, room__resort_id=int(resort_id), log_date=log_date)
            if user.role == "resort":
                logs = logs.filter(room__resort=user.resort)
            if logs.exists():
                resort = Resort.objects.filter(id=int(resort_id)).first()
                label = f"{log_date} - {resort.name if resort else resort_id}"
                if action == "restore":
                    logs.update(is_archived=False)
                    log_activity(user, "Restored daily log", label)
                else:
                    logs.delete()
                    log_activity(user, "Deleted daily log", label)
                    
    elif kind == "attraction":
        found = Attraction.objects.filter(id=request.POST.get("id") or 0, status="archived").select_related("resort")
        if user.role == "resort":
            found = found.filter(resort=user.resort)
        attraction = found.first()
        if attraction:
            label = f"{attraction.name} - {attraction.resort.name}"
            if action == "restore":
                attraction.status = "active"
                attraction.save(update_fields=["status"])
                log_activity(user, "Restored attraction", label)
            else:
                attraction.delete()   # its visitor logs are deleted with it
                log_activity(user, "Deleted attraction", label)

    elif kind == "program" and user.role in ("mto", "admin"):
        program = TourismProgram.objects.filter(id=request.POST.get("id") or 0, status="archived").first()
        if program:
            if action == "restore":
                program.status = "active"
                program.save(update_fields=["status"])
                log_activity(user, "Restored program", program.title)
            else:
                title = program.title
                program.delete()
                log_activity(user, "Deleted program", title)

    return redirect("recycle_bin")

    
import time
from django.conf import settings


def session_status(request):
    now = int(time.time())
    last = request.session.get('last_activity')
    limit = int(getattr(settings, 'SESSION_IDLE_TIMEOUT_MINUTES', 60) * 60)
    if last is None:
        remaining = limit
    else:
        remaining = max(0, limit - (now - last))
    return JsonResponse({'remaining': remaining, 'limit': limit})


def session_ping(request):
    now = int(time.time())
    limit = int(getattr(settings, 'SESSION_IDLE_TIMEOUT_MINUTES', 60) * 60)
    request.session['last_activity'] = now
    return JsonResponse({'remaining': limit, 'limit': limit})

from django.contrib.auth import views as _auth_views
ThrottledPasswordResetView = _auth_views.PasswordResetView
ResetDoneView = _auth_views.PasswordResetDoneView
ResetConfirmView = _auth_views.PasswordResetConfirmView
ResetCompleteView = _auth_views.PasswordResetCompleteView


# ---------------------------------------------------------------- Destinations (what Tourist Bot knows)

def _destination_fields_filled(d):
    """How many of the optional facts the MTO has filled in (shown as a small progress hint)."""
    fields = ["description", "best_time", "entrance_fee", "opening_hours", "activities", "good_for", "tips", "photo_url"]
    return sum(1 for f in fields if getattr(d, f)), len(fields)


@login_required
@role_required("mto", "admin")
def manage_destinations(request):
    destinations = list(Destination.objects.all())
    for d in destinations:
        d.filled, d.filled_total = _destination_fields_filled(d)
    return render(request, "manage_destinations.html", {"destinations": destinations})


@login_required
@role_required("mto", "admin")
def destination_add(request):
    if request.method == "POST":
        form = DestinationForm(request.POST)
        if form.is_valid():
            d = form.save()
            cache.delete_many(["tourist_bot_system_prompt", "tourist_bot_local_data"])
            log_activity(request.user, "Added destination", d.name)
            messages.success(request, f"'{d.name}' was added. Tourist Bot can talk about it now.")
            return redirect("manage_destinations")
    else:
        form = DestinationForm(initial={"sort_order": (Destination.objects.count() + 1)})
    return render(request, "destination_form.html", {"form": form, "title": "Add destination"})


@login_required
@role_required("mto", "admin")
def destination_edit(request, destination_id):
    d = get_object_or_404(Destination, id=destination_id)
    if request.method == "POST":
        form = DestinationForm(request.POST, instance=d)
        if form.is_valid():
            form.save()
            cache.delete_many(["tourist_bot_system_prompt", "tourist_bot_local_data"])
            log_activity(request.user, "Updated destination", d.name)
            messages.success(request, f"'{d.name}' was updated.")
            return redirect("manage_destinations")
    else:
        form = DestinationForm(instance=d)
    return render(request, "destination_form.html", {"form": form, "title": f"Edit {d.name}", "destination": d})


@login_required
@role_required("mto", "admin")
@require_POST
def destination_toggle(request, destination_id):
    d = get_object_or_404(Destination, id=destination_id)
    d.status = "inactive" if d.status == "active" else "active"
    d.save(update_fields=["status"])
    cache.delete_many(["tourist_bot_system_prompt", "tourist_bot_local_data"])
    log_activity(request.user, "Hid destination" if d.status == "inactive" else "Showed destination", d.name)
    return redirect("manage_destinations")


@login_required
@role_required("mto", "admin")
@require_POST
def destination_delete(request, destination_id):
    d = get_object_or_404(Destination, id=destination_id)
    name = d.name
    d.delete()
    cache.delete_many(["tourist_bot_system_prompt", "tourist_bot_local_data"])
    log_activity(request.user, "Deleted destination", name)
    messages.success(request, f"'{name}' was deleted.")
    return redirect("manage_destinations")


# ---------------------------------------------------------------- Questions the bot could not answer

@login_required
@role_required("mto", "admin")
def bot_questions(request):
    if request.method == "POST":
        action = request.POST.get("action")
        if action == "clear_resolved":
            n, _ = BotQuestion.objects.filter(resolved=True).delete()
            messages.success(request, f"Cleared {n} resolved question(s).")
        else:
            q = get_object_or_404(BotQuestion, id=request.POST.get("question_id"))
            if action == "resolve":
                q.resolved = not q.resolved
                q.save(update_fields=["resolved"])
            elif action == "delete":
                q.delete()
        return redirect("bot_questions")
    show = request.GET.get("show", "open")
    qs = BotQuestion.objects.all()
    if show == "open":
        qs = qs.filter(resolved=False)
    elif show == "resolved":
        qs = qs.filter(resolved=True)
    counts = {
        "open": BotQuestion.objects.filter(resolved=False).count(),
        "resolved": BotQuestion.objects.filter(resolved=True).count(),
    }
    return render(request, "bot_questions.html", {"questions": qs[:300], "show": show, "counts": counts})