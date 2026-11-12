"""Public photo submissions + Admin review for the "Glimpses of Bauan" gallery."""
from django.contrib import messages
from django.contrib.auth.decorators import login_required, user_passes_test
from django.core.cache import cache
from django.http import Http404, HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .gallery_models import GalleryPhoto
from .models import log_activity

MAX_BYTES = 4 * 1024 * 1024          # the browser shrinks photos first; this is only a safety limit
PER_IP_PER_HOUR = 6

admin_only = user_passes_test(lambda u: u.is_authenticated and u.role == "admin")


def _image_type(data):
    """Trust the file's own bytes, not its name: JPEG, PNG or WebP only."""
    if data[:3] == b"\xff\xd8\xff":
        return "image/jpeg"
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return "image/png"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "image/webp"
    return None


@csrf_exempt
@require_POST
def api_gallery_submit(request):
    """Anonymous upload from the public site. Saved as Pending; nothing is shown until the Admin approves.
    csrf_exempt is safe for the same reason as the contact form: it only creates a pending row."""
    ip = request.META.get("REMOTE_ADDR", "unknown")
    key = f"gallery_rate_{ip}"
    count = cache.get(key, 0)
    if count >= PER_IP_PER_HOUR:
        return JsonResponse({"error": "Too many photos sent. Please try again later."}, status=429)

    caption = (request.POST.get("caption") or "").strip()[:150]
    name = (request.POST.get("name") or "").strip()[:80]
    f = request.FILES.get("photo")
    if not caption:
        return JsonResponse({"error": "Please add a short caption."}, status=400)
    if not f:
        return JsonResponse({"error": "Please choose a photo."}, status=400)
    if f.size > MAX_BYTES:
        return JsonResponse({"error": "The photo is too large (max 4 MB)."}, status=400)
    data = f.read()
    ctype = _image_type(data)
    if not ctype:
        return JsonResponse({"error": "Please upload a JPG, PNG or WebP photo."}, status=400)

    def as_int(v):
        try:
            return max(0, min(int(v), 10000))
        except (TypeError, ValueError):
            return 0

    GalleryPhoto.objects.create(
        caption=caption, submitted_by=name, image=data, content_type=ctype,
        width=as_int(request.POST.get("width")), height=as_int(request.POST.get("height")),
    )
    cache.set(key, count + 1, timeout=3600)
    return JsonResponse({"success": True})


def api_gallery_list(request):
    """Approved photos for the public gallery (newest first)."""
    photos = GalleryPhoto.objects.filter(status="approved").only("id", "caption", "submitted_by", "width", "height")[:60]
    return JsonResponse({"photos": [
        {"url": reverse("gallery_photo_image", args=[p.id]), "caption": p.caption,
         "by": p.submitted_by, "w": p.width, "h": p.height}
        for p in photos
    ]})


def gallery_photo_image(request, pk):
    """Serves the image. Approved photos are public; pending/rejected ones only for the Admin."""
    p = get_object_or_404(GalleryPhoto, pk=pk)
    is_admin = request.user.is_authenticated and getattr(request.user, "role", "") == "admin"
    if p.status != "approved" and not is_admin:
        raise Http404
    resp = HttpResponse(bytes(p.image), content_type=p.content_type)
    resp["Cache-Control"] = "public, max-age=86400" if p.status == "approved" else "private, no-store"
    resp["X-Content-Type-Options"] = "nosniff"
    return resp


@login_required
@admin_only
def gallery_review(request):
    status = request.GET.get("status", "pending")
    if status not in ("pending", "approved", "rejected"):
        status = "pending"
    counts = {s: GalleryPhoto.objects.filter(status=s).count() for s in ("pending", "approved", "rejected")}
    photos = GalleryPhoto.objects.filter(status=status).defer("image")[:120]
    return render(request, "gallery_review.html", {"photos": photos, "status": status, "counts": counts})


@login_required
@admin_only
@require_POST
def gallery_review_action(request, pk):
    p = get_object_or_404(GalleryPhoto.objects.defer("image"), pk=pk)
    action = request.POST.get("action")
    back = request.POST.get("next") or reverse("gallery_review")
    if action in ("approve", "reject"):
        p.status = "approved" if action == "approve" else "rejected"
        p.reviewed_at = timezone.now()
        p.reviewed_by = request.user
        p.review_note = (request.POST.get("note") or "").strip()[:200]
        p.save(update_fields=["status", "reviewed_at", "reviewed_by", "review_note"])
        log_activity(request.user, f"{p.status} gallery photo", p.caption)
        messages.success(request, f"Photo “{p.caption}” {'is now on the website' if p.status == 'approved' else 'was rejected and is hidden'}.")
    elif action == "delete":
        caption = p.caption
        p.delete()
        log_activity(request.user, "deleted gallery photo", caption)
        messages.success(request, f"Photo “{caption}” was deleted.")
    return redirect(back)
