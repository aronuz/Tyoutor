from rest_framework import serializers

from Tutors.models import Tutor


class TutorSerializer(serializers.ModelSerializer):
    tutor = serializers.StringRelatedField()
    created_at = serializers.StringRelatedField()

    class Meta:
        model = Tutor
        exclude = ["updated_at"]

    def get_created_at(self, instance):
        return instance.created_at.strftime("%B %d, %Y")
