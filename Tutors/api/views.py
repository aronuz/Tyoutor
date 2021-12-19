from django.http.response import JsonResponse
from rest_framework import generics, viewsets
from rest_framework.exceptions import ValidationError

from core.pagination import TutorPagination, AreaPagination, RequestPagination
from Tutors.api.permissions import IsSelfOrReadOnly
from Tutors.api.serializers import TutorSerializer, AreaSerializer, RequestSerializer
from Tutors.models import Tutor, Area, Request


class TutorViewSet(viewsets.ModelViewSet):
    queryset = Tutor.objects.all().order_by('-created_at')
    serializer_class = TutorSerializer
    lookup_field = "tutor_id"
    permission_classes = [IsSelfOrReadOnly]
    pagination_class = TutorPagination

    def perform_create(self, serializer):
        if Tutor.objects.filter(tutor_user=self.request.user).exists():
            raise ValidationError("You have already registered as a tutor!")
        serializer.save(tutor_user=self.request.user)


class AreasListAPIView(generics.ListAPIView):
    serializer_class = AreaSerializer
    pagination_class = AreaPagination

    def get_queryset(self):
        tutor_id = self.kwargs.get("tutor_id", None)
        if tutor_id:
            return Area.objects.filter(tutor_id=tutor_id).order_by("area")
        else:
            return Area.objects.all().order_by("area")


def AreaCreateAPIView(request):
    request_user = request.user
    areas = ['see', 'hear', 'touch']
    tutor = generics.get_object_or_404(Tutor, tutor_user=request_user)
    has_area = 0
    for area in areas:
        area_id = '{}@{}'.format(area, tutor.tutor_id)
        if not tutor.areas.filter(area_id=area_id).exists():
            Area.objects.create(area_id=area_id, tutor=tutor, area=area)
        else:
            has_area += 1

    added_num = len(areas) - has_area
    data = {
        'success': not has_area,
        'added': added_num
    }
    if has_area:
        data['message'] = '{} areas were added. User has previously added {} areas.'.format(
            added_num, has_area)

    return JsonResponse(data)


class AreaRUDAPView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer
    permission_classes = [IsSelfOrReadOnly]
    lookup_field = "area_id"


class RequestsListAPIView(generics.ListAPIView):
    serializer_class = RequestSerializer
    pagination_class = RequestPagination

    def get_queryset(self):
        tutor_id = self.kwargs.get("tutor_id")
        print('id: {}'.format(tutor_id))
        return Request.objects.filter(tutor_id=tutor_id).order_by("-created_at")


class RequestCreateAPIView(generics.CreateAPIView):
    # queryset = Request.objects.all().order_by("-created_at")
    serializer_class = RequestSerializer

    def perform_create(self, serializer):
        tutor_id = self.kwargs.get("tutor_id")
        tutor = generics.get_object_or_404(Tutor, tutor_id=tutor_id)
        request_id = self.request.data.get("requestId")
        email = self.request.data.get("userEmail")
        message = self.request.data.get("message")
        serializer.save(request_id=request_id, tutor=tutor,
                        email=email, message=message)


class RequestRUDAPView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    permission_classes = [IsSelfOrReadOnly]
    lookup_field = "request_id"
