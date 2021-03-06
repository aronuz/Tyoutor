from django.urls.conf import include, path
from rest_framework.routers import DefaultRouter

from Tutors.api import views as tutor_views

router = DefaultRouter()
router.register(r"tutors", tutor_views.TutorViewSet)
router.register(r'photoupload', tutor_views.PhotoUploadView)

urlpatterns = [
    path("", include(router.urls)),
    path("tutors/ids/", tutor_views.getIds, name="get_ids"),
    path("tutors/<str:name_filter>/",
         tutor_views.TutorsListAPIView.as_view(), name="tutor_filter"),
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
    path("contacts/",
         tutor_views.ContactsListAPIView.as_view(), name="contact-list"),
    path("contact/<int:contact_id>/add",
         tutor_views.ContactCreateAPIView.as_view(), name="contact-add"),
    path("contact/<int:contact_id>/remove",
         tutor_views.ContactRUDAPView.as_view(), name="contact-remove"), 
]
