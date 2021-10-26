from django.db import models
from rest_framework import serializers

from Tutors.models import Tutors, Areas


class TutorSerializer(serializers.ModelSerializer):
    tutor = serializers.StringRelatedField()
    created_at = serializers.StringRelatedField()
    tutor_id = serializers.SerializerMethodField()

    class Meta:
        model = Tutors
        exclude = ["id", "updated_at"]

    def get_created_at(self, instance):
        return instance.created_at.strftime("%B %d, %Y")

    def get_tutor_id(self, instance):
        return instance.tutor_id

    def get_areas_count(self, instance):
        return instance.areas.count()


class AreaSerializer(serializers.ModelSerializer):
    created_at = serializers.StringRelatedField()
    updated_at = serializers.StringRelatedField()

    class Meta:
        model = Areas
        exclude = ["id", "tutor", "tutor_id"]

    def get_created_at(self, instance):
        return instance.created_at.strftime("%B %d, %Y")

    def get_updated_at(self, instance):
        return instance.updated_at.strftime("%B %d, %Y")

    def get_tutor_id(self, instance):
        return instance.tutor.tutor_id
