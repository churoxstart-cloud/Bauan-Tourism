from django.urls import path

from . import gallery_views as v

urlpatterns = [
    path("api/gallery/submit/", v.api_gallery_submit, name="api_gallery_submit"),
    path("api/gallery/", v.api_gallery_list, name="api_gallery_list"),
    path("gallery/photo/<int:pk>/", v.gallery_photo_image, name="gallery_photo_image"),
    path("admin-panel/gallery/", v.gallery_review, name="gallery_review"),
    path("admin-panel/gallery/<int:pk>/", v.gallery_review_action, name="gallery_review_action"),
]
