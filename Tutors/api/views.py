from django.http import request
from rest_framework import generics, viewsets
from rest_framework.exceptions import ValidationError

from Tutors.api.permissions import IsSelfOrReadOnly
from Tutors.api.serializers import TutorSerializer, AreaSerializer, RequestSerializer
from Tutors.models import Tutor, Area, Request


class TutorViewSet(viewsets.ModelViewSet):
    queryset = Tutor.objects.all().order_by('-created_at')
    serializer_class = TutorSerializer
    lookup_field = "tutor_id"
    permission_classes = [IsSelfOrReadOnly]

    def perform_create(self, serializer):
        if Tutor.objects.filter(tutor_user=self.request.user).exists():
            raise ValidationError("You have already registered as a tutor!")
        serializer.save(tutor_user=self.request.user)


class AreasListAPIView(generics.ListAPIView):
    serializer_class = AreaSerializer

    def get_queryset(self):
        tutor_id = self.kwargs.get("tutor_id")
        return Area.objects.filter(tutor_id=tutor_id).order_by("area")


# class AreaCreateAPIView(generics.CreateAPIView):
    # queryset = Area.objects.all()
    # serializer_class = AreaSerializer

    # def perform_create(self, serializer):
    #     request_user = self.request.user
    #     # areas = self.request.POST.get("area")
    #     areas = ['type', 'read', 'write']
    #     tutor = generics.get_object_or_404(Tutor, tutor_user=request_user)
    #     has_area = 0
    #     for area in areas:
    #         # area_id = '{}@{}'.format(area, tutor.tutor_id)
    #         # if not tutor.areas.filter(area_id=area_id).exists():
    #         # serializer.save(area_id=area_id, tutor=tutor, area=area)
    #         # else:
    #         #     has_area += 1
    #         area_id = '{}@{}'.format(area, tutor.tutor_id)
    #         if not tutor.areas.filter(area_id=area_id).exists():
    #             Area.objects.create(area_id=area_id, tutor=tutor, area=area)
    #         else:
    #             has_area += 1

    #     if has_area:
    #         raise ValidationError(
    #             "Some areas of expertise were already added.")
def AreaCreateAPIView(self):

        request_user = self.request.user
        areas = ['type', 'read', 'write']
        tutor = generics.get_object_or_404(Tutor, tutor_user=request_user)
        has_area = 0
        for area in areas:
            area_id = '{}@{}'.format(area, tutor.tutor_id)
            if not tutor.areas.filter(area_id=area_id).exists():
                Area.objects.create(area_id=area_id, tutor=tutor, area=area)
            else:
                has_area += 1

        if has_area:
            raise ValidationError(
                "Some areas of expertise were already added.")
    


class AreaRUDAPView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer
    permission_classes = [IsSelfOrReadOnly]
    lookup_field = "area_id"


class RequestsListAPIView(generics.ListAPIView):
    serializer_class = RequestSerializer

    def get_queryset(self):
        tutor_id = self.kwargs.get("tutor_id")
        return Request.objects.filter(tutor_id=tutor_id).order_by("-created_at")


class RequestCreateAPIView(generics.CreateAPIView):
    queryset = Request.objects.all().order_by("-created_at")
    serializer_class = RequestSerializer

    def perform_create(self, serializer):
        request_id = self.kwargs.get("request_id")
        tutor_id = self.request.POST.get("tutor_id")
        email = self.request.POST.get("email")
        message = self.request.POST.get("message")
        serializer.save(request_id=request_id, tutor_id=tutor_id,
                        email=email, message=message)


class RequestRUDAPView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    permission_classes = [IsSelfOrReadOnly]
    lookup_field = "request_id"
