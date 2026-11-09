from .models import PasswordRequest


def admin_counts(request):
    """Number of waiting password requests, for the badge in the Admin sidebar."""
    user = getattr(request, "user", None)
    if user is None or not user.is_authenticated or getattr(user, "role", None) != "admin":
        return {}
    return {"pw_request_count": PasswordRequest.objects.filter(status="pending").count()}
