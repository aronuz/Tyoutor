from django.urls.conf import include, path
from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter

from Tutors.api import views as tutor_views

router = DefaultRouter()
router.register(r"tutors", tutor_views.TutorViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("tutors/<tutor_id:tutor_id>/areas/",
         tutor_views.AreasListAPIView.as_view(), name="area-list"),
    path("tutors/<tutor_id:tutor_id>/area/>",
         tutor_views.AreaCreateAPIView.as_view(), name="area-add"),
    path("areas/<area_id:area_id>/",
         tutor_views.AreaRUDAPView.as_view(), name="area-detail")
]
