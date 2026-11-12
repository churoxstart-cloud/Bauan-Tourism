from django import template

register = template.Library()


@register.simple_tag
def gallery_pending_count():
    """Number of tourist photos waiting for the Admin (shown as a badge in the sidebar)."""
    from core.gallery_models import GalleryPhoto
    try:
        return GalleryPhoto.objects.filter(status="pending").count()
    except Exception:          # table not created yet (before migrate)
        return 0
