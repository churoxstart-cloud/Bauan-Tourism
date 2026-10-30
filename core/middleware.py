import time

from django.conf import settings
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.urls import reverse


class IdleTimeoutMiddleware:
    """Sign people out after SESSION_IDLE_TIMEOUT_MINUTES without activity.

    Every normal request counts as activity. /session/status/ does not, so the page can ask
    "how long is left?" without keeping the session alive by itself."""

    SKIP_PREFIXES = ("/static/", "/media/", "/session/status/")

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated and not request.path.startswith(self.SKIP_PREFIXES):
            limit = int(getattr(settings, "SESSION_IDLE_TIMEOUT_MINUTES", 60) * 60)
            now = int(time.time())
            last = request.session.get("last_activity")
            if last is not None and now - last > limit:
                logout(request)
                return redirect(f"{reverse('login')}?timeout=1")
            request.session["last_activity"] = now
        return self.get_response(request)


class NoCacheMiddleware:
    """Private pages must never be kept by the browser, so the Back button after
    logout asks the server again (and the server sends the user to the login form)."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.user.is_authenticated and not request.path.startswith(("/static/", "/media/")):
            response["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0, private"
            response["Pragma"] = "no-cache"
            response["Expires"] = "0"
        return response