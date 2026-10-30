from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import (
    Attraction,
    AttractionVisitorLog,
    BotQuestion,
    Destination,
    Report,
    Resort,
    Room,
    RoomDailyLog,
    SystemUser,
    TourismProgram,
)
from .models import ContactMessage
admin.site.register(ContactMessage)

@admin.register(SystemUser)
class SystemUserAdmin(UserAdmin):
    list_display = ("username", "role", "resort", "status", "is_active")
    search_fields = ("username", "email")
    list_filter = ("role", "status")
    fieldsets = UserAdmin.fieldsets + (
        (None, {"fields": ("role", "resort", "status")}),
    )


@admin.register(Resort)
class ResortAdmin(admin.ModelAdmin):
    list_display = ("name", "barangay", "total_rooms", "status")
    search_fields = ("name", "barangay")
    list_filter = ("status",)


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ("resort", "room_number", "capacity")
    search_fields = ("room_number", "resort__name")
    list_filter = ("resort",)


@admin.register(RoomDailyLog)
class RoomDailyLogAdmin(admin.ModelAdmin):
    list_display = ("room", "log_date", "guests_checked_in", "guests_overnight")
    search_fields = ("room__room_number", "room__resort__name")
    list_filter = ("log_date",)


@admin.register(Attraction)
class AttractionAdmin(admin.ModelAdmin):
    list_display = ("name", "resort", "attraction_type", "status")
    search_fields = ("name", "resort__name")
    list_filter = ("attraction_type", "status")


@admin.register(AttractionVisitorLog)
class AttractionVisitorLogAdmin(admin.ModelAdmin):
    list_display = ("attraction", "log_date", "grand_total")
    search_fields = ("attraction__name",)
    list_filter = ("log_date",)


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ("resort", "month", "year", "status")
    search_fields = ("resort__name",)
    list_filter = ("status", "year")


admin.site.register(TourismProgram)


admin.site.site_header = "Bauan Tourism Portal — Admin"
admin.site.site_title = "Bauan Tourism Admin"
admin.site.index_title = "System Administration"

@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "status", "sort_order")
    list_filter = ("category", "status")
    search_fields = ("name", "description")


@admin.register(BotQuestion)
class BotQuestionAdmin(admin.ModelAdmin):
    list_display = ("question", "count", "reason", "resolved", "last_asked")
    list_filter = ("resolved", "lang")