"""Tourist photo submissions for the public "Glimpses of Bauan" gallery.
A photo is saved as Pending and only appears on the website after the Admin approves it.
The image is stored in the database (already resized to JPEG in the visitor's browser), so no
media-folder setup is needed on the server."""
from django.conf import settings
from django.db import models


class GalleryPhoto(models.Model):
    STATUS_CHOICES = [("pending", "Pending"), ("approved", "Approved"), ("rejected", "Rejected")]

    caption = models.CharField(max_length=150)
    submitted_by = models.CharField(max_length=80, blank=True)
    image = models.BinaryField()
    content_type = models.CharField(max_length=30, default="image/jpeg")
    width = models.PositiveIntegerField(default=0)
    height = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)
    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="+"
    )
    review_note = models.CharField(max_length=200, blank=True)

    class Meta:
        app_label = "core"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.caption} ({self.status})"
