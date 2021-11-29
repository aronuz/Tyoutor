from django.urls.conf import include, path
from rest_framework.routers import DefaultRouter

from Tutors.api import views as tutor_views

router = DefaultRouter()
router.register(r"tutors", tutor_views.TutorViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("areas/",
         tutor_views.AreasListAPIView.as_view(), name="area-list"),
    path("tutors/<str:tutor_id>/areas/",
         tutor_views.AreasListAPIView.as_view(), name="area-list"),
    path("tutors/area/",
         tutor_views.AreaCreateAPIView, name="area-add"),
    #     path("areas/>",
    #          tutor_views.AreaCreateAPIView.as_view(), name="area-add"),
    path("tutors/<str:tutor_id>/areas/<int:area_id>/",
         tutor_views.AreaRUDAPView.as_view(), name="area"),
    path("tutors/<str:tutor_id>/requests/new",
         tutor_views.RequestCreateAPIView.as_view(), name="request-add"),
    path("tutors/<str:tutor_id>/requests/update/<str:request_id>/",
         tutor_views.RequestRUDAPView.as_view(), name="request"),
    path("tutors/<str:tutor_id>/requests/",
         tutor_views.RequestsListAPIView.as_view(), name="request-list"),
]
