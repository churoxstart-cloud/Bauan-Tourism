from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.urls import reverse_lazy
from .forms import StaffPasswordResetForm

from . import views
from .chat import api_chat

urlpatterns = [
    # ---------- public ----------
    path("", views.landing_view, name="landing"),
    path("get-started/", views.get_started_view, name="get_started"),
    path("terms/", views.terms_view, name="terms"),
    path("api/resorts/", views.api_resorts, name="api_resorts"),
    path("api/contact/", views.api_contact, name="api_contact"),
    path("api/contact", views.api_contact),  # script.js posts to this exact URL (no trailing slash)
    path("api/chat/", api_chat, name="api_chat"),
        path("session/status/", views.session_status, name="session_status"),
    path("session/ping/", views.session_ping, name="session_ping"),
    path("forgot-password/", views.ThrottledPasswordResetView.as_view(
        template_name="auth/password_reset_form.html",
        form_class=StaffPasswordResetForm,
        email_template_name="auth/password_reset_email.txt",
        subject_template_name="auth/password_reset_subject.txt",
        success_url=reverse_lazy("password_reset_done"),
    ), name="password_reset"),
    path("forgot-password/sent/", views.ResetDoneView.as_view(template_name="auth/password_reset_done.html"), name="password_reset_done"),
    path("reset/<uidb64>/<token>/", views.ResetConfirmView.as_view(
        template_name="auth/password_reset_confirm.html", success_url=reverse_lazy("password_reset_complete"),
    ), name="password_reset_confirm"),
    path("reset/done/", views.ResetCompleteView.as_view(template_name="auth/password_reset_complete.html"), name="password_reset_complete"),

    # ---------- sign in ----------
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("register/", views.register_view, name="register"),
    path("dashboard/", views.dashboard, name="dashboard"),

    # ---------- password reset ----------
    path("forgot-password/", views.forgot_password_view, name="forgot_password"),
    path("reset/<uidb64>/<token>/", views.reset_password_view, name="reset_password"),

    # ---------- profile ----------
    path("profile/", views.my_profile, name="my_profile"),
    path("admin-panel/users/<int:user_id>/", views.user_profile, name="user_profile"),

    # ---------- resort staff only: /resort/... ----------
    path("resort/daily-log/", views.resort_daily_log, name="resort_daily_log"),
    path("resort/daily-log/action/", views.resort_daily_log_action, name="resort_daily_log_action"),
    path("resort/daily-log/export-excel/", views.export_daily_log, name="export_daily_log"),
    path("resort/monthly-report/", views.resort_monthly_sheet, name="resort_monthly_sheet"),
    path("resort/attractions/", views.resort_attractions, name="resort_attractions"),
    path("attractions/<int:attraction_id>/archive/", views.attraction_archive, name="attraction_archive"),
    path(
        "resort/attractions/<int:attraction_id>/visitor-log/",
        views.attraction_visitor_log,
        name="attraction_visitor_log",
    ),
    path(
        "resort/attractions/<int:attraction_id>/monthly-report/",
        views.attraction_monthly_sheet,
        name="attraction_monthly_sheet",
    ),
    path("resort/programs/", views.view_programs, name="view_programs"),
    path("resort/my-resort/", views.edit_resort_details, name="edit_resort_details"),
    path("resort/rooms/", views.manage_rooms, name="manage_rooms"),
    path("recycle-bin/", views.recycle_bin, name="recycle_bin"),
    path("recycle-bin/action/", views.recycle_bin_action, name="recycle_bin_action"),

    # ---------- MTO staff and admin (shared pages) ----------
    path("reports/annual-summary/", views.mto_annual_summary, name="mto_annual_summary"),
    path("reports/annual-summary/print/", views.mto_annual_sheet, name="mto_annual_sheet"),
    path("reports/annual-summary/export-excel/", views.export_mto_summary, name="export_mto_summary"),
    path("programs/manage/", views.manage_programs, name="manage_programs"),
    path("attractions/add/", views.add_attraction, name="add_attraction"),
    path("destinations/", views.manage_destinations, name="manage_destinations"),
    path("destinations/add/", views.destination_add, name="destination_add"),
    path("destinations/<int:destination_id>/edit/", views.destination_edit, name="destination_edit"),
    path("destinations/<int:destination_id>/toggle/", views.destination_toggle, name="destination_toggle"),
    path("destinations/<int:destination_id>/delete/", views.destination_delete, name="destination_delete"),
    path("bot-questions/", views.bot_questions, name="bot_questions"),
    path("contact-messages/", views.contact_inbox, name="contact_inbox"),

    # ---------- admin only: /admin-panel/... ----------
    path("admin-panel/users/", views.manage_users, name="manage_users"),
    path("admin-panel/activity-log/", views.activity_log, name="activity_log"),
    path("admin-panel/resorts/", views.admin_resorts, name="admin_resorts"),
    path("admin-panel/resorts/add/", views.resort_form, name="resort_add"),
    path("admin-panel/resorts/<int:resort_id>/edit/", views.resort_form, name="resort_edit"),
    path("admin-panel/resorts/<int:resort_id>/toggle/", views.resort_toggle, name="resort_toggle"),
    path("admin-panel/rooms/", views.admin_rooms, name="admin_rooms"),
    path("admin-panel/attractions/", views.admin_attractions, name="admin_attractions"),
    path("admin-panel/attractions/<int:attraction_id>/edit/", views.attraction_edit, name="attraction_edit"),
    path("admin-panel/attractions/<int:attraction_id>/toggle/", views.attraction_toggle, name="attraction_toggle"),
    
    path("programs/<int:pk>/archive/", views.program_toggle_archive, name="program_toggle_archive"),
    path("programs/<int:pk>/delete/", views.program_delete, name="program_delete"),
    
]