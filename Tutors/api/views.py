from rest_framework import generics, viewsets
from rest_framework.exceptions import ValidationError

from Tutors.api.permissions import IsSelfOrReadOnly
from Tutors.api.serializers import TutorSerializer, AreaSerializer
from Tutors.models import Tutors, Areas


class TutorViewSet(viewsets.ModelViewSet):
    queryset = Tutors.objects.all().order_by('-created_at')
    serializer_class = TutorSerializer
    lookup_field = "tutor_id"
    permission_classes = [IsSelfOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(tutor=self.request.user)


class AreasListAPIView(generics.ListAPIView):
    serializer_class = AreaSerializer

    def get_queryset(self):
        tutor_id = self.kwargs.get("tutor_id")
        return Areas.objects.filter(tutor_id=tutor_id).order_by("-created_at")


class AreaCreateAPIView(generics.CreateAPIView):
    queryset = Tutors.objects.all().order_by("-created_at")
    serializer_class = AreaSerializer

    def perform_create(self, serializer):
        request_user = self.request.user
        area = self.request.POST.get("area")
        tutor = generics.get_object_or_404(Tutors, tutor=request_user)
        if tutor.areas.filter(area=area).exists():
            raise ValidationError("You have added this area of expertise.")
        serializer.save(tutor=tutor, area=area)


class AreaRUDAPView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Areas.objects.all()
    serializer_class = AreaSerializer
    permission_classes = [IsSelfOrReadOnly]
    lookup_field = "area_id"
