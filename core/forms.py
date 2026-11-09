from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.forms import PasswordResetForm
from django.db.models import Count, Q

from .models import (
    Attraction,
    AttractionVisitorLog,
    Destination,
    Resort,
    Room,
    RoomDailyLog,
    SystemUser,
    TourismProgram,
)


class LoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={"class": "form-control"}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={"class": "form-control"}))


class RegisterForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(attrs={"class": "form-control"}))
    role = forms.ChoiceField(
        choices=[("mto", "MTO Staff"), ("resort", "Resort Staff")],
        widget=forms.Select(attrs={"class": "form-select"}),
    )

    class Meta:
        model = SystemUser
        fields = ["username", "email", "role", "resort", "password"]
        widgets = {
            "username": forms.TextInput(attrs={"class": "form-control"}),
            "email": forms.EmailInput(attrs={"class": "form-control"}),
            "resort": forms.Select(attrs={"class": "form-select"}),
        }

    def clean(self):
        cleaned = super().clean()
        role, resort = cleaned.get("role"), cleaned.get("resort")
        if role == "resort" and not resort:
            self.add_error("resort", "Please choose the resort you work for.")
        elif role == "mto":
            cleaned["resort"] = None          # MTO staff are not tied to one resort
        return cleaned

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        user.status = "pending"
        if commit:
            user.save()
        return user


NUM_ATTRS = {"class": "form-control", "min": 0}

_ROOM_LOG_FIELDS = [
    "guests_checked_in",
    "guests_overnight",
    "male",
    "female",
    "this_municipality",
    "this_province",
    "other_province",
    "foreign_country",
]


class RoomDailyLogForm(forms.ModelForm):
    class Meta:
        model = RoomDailyLog
        fields = _ROOM_LOG_FIELDS + ["rooms_occupied", "nationality"]
        widgets = {
            **{f: forms.NumberInput(attrs=NUM_ATTRS) for f in _ROOM_LOG_FIELDS},
            "rooms_occupied": forms.CheckboxInput(attrs={"class": "form-check-input"}),
            "nationality": forms.TextInput(attrs={"class": "form-control"}),
        }


RoomDailyLogFormSet = forms.modelformset_factory(RoomDailyLog, form=RoomDailyLogForm, extra=0)

_ATTR_LOG_FIELDS = [
    "male_this_municipality",
    "female_this_municipality",
    "male_this_province",
    "female_this_province",
    "male_other_province",
    "female_other_province",
    "male_foreign",
    "female_foreign",
]


class AttractionVisitorLogForm(forms.ModelForm):
    class Meta:
        model = AttractionVisitorLog
        fields = _ATTR_LOG_FIELDS
        widgets = {f: forms.NumberInput(attrs=NUM_ATTRS) for f in _ATTR_LOG_FIELDS}


class AttractionForm(forms.ModelForm):
    class Meta:
        model = Attraction
        fields = ["resort", "name", "attraction_type", "status"]
        widgets = {
            "resort": forms.Select(attrs={"class": "form-select"}),
            "name": forms.TextInput(attrs={"class": "form-control"}),
            "attraction_type": forms.Select(attrs={"class": "form-select"}),
            "status": forms.Select(
                choices=[("active", "Active"), ("inactive", "Inactive")],
                attrs={"class": "form-select"},
            ),
        }


class TourismProgramForm(forms.ModelForm):
    AUDIENCE_CHOICES = [
        ("all", "All resort staff"),
        ("selected", "Only specific resorts"),
    ]
    audience = forms.ChoiceField(
        choices=AUDIENCE_CHOICES, initial="all", widget=forms.RadioSelect, label="Send to"
    )
    recipients = forms.ModelMultipleChoiceField(
        queryset=Resort.objects.none(), required=False, widget=forms.CheckboxSelectMultiple
    )

    class Meta:
        model = TourismProgram
        fields = ["title", "description", "status", "recipients"]
        widgets = {
            "title": forms.TextInput(attrs={"class": "form-control"}),
            "description": forms.Textarea(attrs={"class": "form-control", "rows": 3}),
            "status": forms.Select(attrs={"class": "form-select", "autocomplete": "off"}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # active resorts only; staff_count lets the page flag resorts with nobody to receive it
        self.fields["recipients"].queryset = (
            Resort.objects.filter(status="active")
            .annotate(staff_count=Count("staff", filter=Q(staff__status="approved", staff__role="resort")))
            .order_by("name")
        )

    def clean(self):
        cleaned = super().clean()
        if cleaned.get("audience") == "selected":
            if not cleaned.get("recipients"):
                self.add_error("recipients", "Pick at least one resort, or choose \"All resort staff\".")
        else:
            cleaned["recipients"] = Resort.objects.none()
        return cleaned

    def save(self, commit=True):
        self.instance.send_to_all = self.cleaned_data.get("audience") != "selected"
        return super().save(commit=commit)


class ResortDetailsForm(forms.ModelForm):
    class Meta:
        model = Resort
        fields = ["address", "owner_name", "contact_number", "total_rooms"]
        widgets = {
            "address": forms.TextInput(attrs={"class": "form-control"}),
            "owner_name": forms.TextInput(attrs={"class": "form-control"}),
            "contact_number": forms.TextInput(attrs={"class": "form-control"}),
            "total_rooms": forms.NumberInput(attrs={"class": "form-control", "min": 0}),
        }


class RoomForm(forms.ModelForm):
    class Meta:
        model = Room
        fields = ["room_number", "capacity"]
        widgets = {
            "room_number": forms.TextInput(attrs={"class": "form-control", "placeholder": "e.g. 1"}),
            "capacity": forms.NumberInput(attrs={"class": "form-control", "min": 1}),
        }
        
# ADD THIS TO THE END OF core/forms.py
# (Room, Resort and Attraction are already imported there from .models)


class ResortAdminForm(forms.ModelForm):
    class Meta:
        model = Resort
        fields = ["name", "barangay", "address", "owner_name", "contact_number", "total_rooms", "status"]
        widgets = {
            "name": forms.TextInput(attrs={"class": "form-control"}),
            "barangay": forms.TextInput(attrs={"class": "form-control"}),
            "address": forms.TextInput(attrs={"class": "form-control"}),
            "owner_name": forms.TextInput(attrs={"class": "form-control"}),
            "contact_number": forms.TextInput(attrs={"class": "form-control"}),
            "total_rooms": forms.NumberInput(attrs={"class": "form-control", "min": 0}),
            "status": forms.Select(attrs={"class": "form-select"}),
        }


class RoomAdminForm(forms.ModelForm):
    class Meta:
        model = Room
        fields = ["resort", "room_number", "capacity"]
        widgets = {
            "resort": forms.Select(attrs={"class": "form-select"}),
            "room_number": forms.TextInput(attrs={"class": "form-control", "placeholder": "e.g. 1"}),
            "capacity": forms.NumberInput(attrs={"class": "form-control", "min": 1}),
        }


class UserPasswordForm(forms.Form):
    """Used by both the self-service profile page and the admin bulk-reset form."""
    new_password1 = forms.CharField(
        widget=forms.PasswordInput(attrs={"class": "form-control", "placeholder": "New password"}),
        label="New password",
    )
    new_password2 = forms.CharField(
        widget=forms.PasswordInput(attrs={"class": "form-control", "placeholder": "Confirm new password"}),
        label="Confirm new password",
    )

    def clean(self):
        cleaned = super().clean()
        p1 = cleaned.get("new_password1")
        p2 = cleaned.get("new_password2")
        if p1 and p2 and p1 != p2:
            self.add_error("new_password2", "The two passwords do not match.")
        return cleaned


class UserProfileForm(forms.ModelForm):
    """For a user to change their own username (and optionally email)."""

    class Meta:
        model = SystemUser
        fields = ["username", "email"]
        widgets = {
            "username": forms.TextInput(attrs={"class": "form-control"}),
            "email": forms.EmailInput(attrs={"class": "form-control"}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Username uniqueness check is done in the view so we can show a friendly error.

class StaffPasswordResetForm(PasswordResetForm):
    """Forgot-password form that accepts the username OR the email on the account.
    The reset link is always sent to the email saved on the account."""

    email = forms.CharField(
        label="Username or email",
        max_length=254,
        widget=forms.TextInput(attrs={"autocomplete": "username", "autofocus": True}),
    )

    def get_users(self, email):
        ident = (email or "").strip()
        matches = SystemUser.objects.filter(
            Q(username__iexact=ident) | Q(email__iexact=ident), is_active=True
        ).exclude(email="")
        return (u for u in matches if u.has_usable_password())

class DestinationForm(forms.ModelForm):
    class Meta:
        model = Destination
        fields = [
            "name", "category", "description", "description_tl", "best_time", "entrance_fee",
            "opening_hours", "activities", "good_for", "tips", "photo_url", "map_query",
            "status", "sort_order",
        ]
        widgets = {
            "name": forms.TextInput(attrs={"class": "form-control"}),
            "category": forms.Select(attrs={"class": "form-select"}),
            "description": forms.Textarea(attrs={"class": "form-control", "rows": 3}),
            "description_tl": forms.Textarea(attrs={"class": "form-control", "rows": 3}),
            "best_time": forms.TextInput(attrs={"class": "form-control"}),
            "entrance_fee": forms.TextInput(attrs={"class": "form-control"}),
            "opening_hours": forms.TextInput(attrs={"class": "form-control"}),
            "activities": forms.TextInput(attrs={"class": "form-control"}),
            "good_for": forms.TextInput(attrs={"class": "form-control"}),
            "tips": forms.Textarea(attrs={"class": "form-control", "rows": 3}),
            "photo_url": forms.URLInput(attrs={"class": "form-control", "placeholder": "https://..."}),
            "map_query": forms.TextInput(attrs={"class": "form-control"}),
            "status": forms.Select(attrs={"class": "form-select"}),
            "sort_order": forms.NumberInput(attrs={"class": "form-control"}),
        }
