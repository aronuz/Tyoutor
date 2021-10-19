from rest_framework import viewsets

from Tutors.api.permissions import IsSelfOrReadOnly
from Tutors.api.serializers import TutorSerializer
from Tutors.models import Tutor


class TutorViewSet(viewsets.ModelViewSet):
    queryset = Tutor.objects.all().order_by('-created_at')
    serializer_class = TutorSerializer
    lookup_field = "id"
    permission_classes = [IsSelfOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(tutor=self.request.user)
