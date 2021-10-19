from django.urls.conf import include, path
from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter

from Tutors.api import views as tutor_views

router = DefaultRouter()
router .register(r"tutors", tutor_views.TutorViewSet)

urlpatterns = [
    path("", include(router.urls))
]
