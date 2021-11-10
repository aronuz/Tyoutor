from rest_framework import serializers

from Tutors.models import Tutors, Areas


class TutorSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    tutor_id = serializers.StringRelatedField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    hourly_rate = serializers.SerializerMethodField()
    areas = serializers.SerializerMethodField()

    class Meta:
        model = Tutors
        exclude = ["id", "tutor_user", "updated_at"]

    def get_created_at(self, instance):
        return instance.created_at.strftime("%B %d, %Y")

    def get_first_name(self, instance):
        return instance.tutor_user.first_name

    def get_last_name(self, instance):
        return instance.tutor_user.last_name

    def get_email(self, instance):
        return instance.tutor_user.email

    def get_hourly_rate(self, instance):
        return '${}/hr'.format(instance.hourly_rate)

    def get_areas(self, instance):
        areas = instance.areas.all().order_by('area')
        area_list = []
        for item in areas:
            area_list.append(item.area)
        return area_list


class AreaSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    area = serializers.StringRelatedField()
    tutor_id = serializers.SerializerMethodField()

    class Meta:
        model = Areas
        exclude = ["id", "tutor", "updated_at"]

    def get_created_at(self, instance):
        return instance.created_at.strftime("%B %d, %Y")

    def get_tutor_id(self, instance):
        return instance.tutor.tutor_id


class RequestSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    sender_email = serializers.StringRelatedField()
    request_id = serializers.StringRelatedField
    message = serializers.StringRelatedField()
    tutor_id = serializers.SerializerMethodField()

    class Meta:
        model = Areas
        exclude = ["id", "updated_at"]

    def get_created_at(self, instance):
        return instance.created_at.strftime("%B %d, %Y")

    def get_tutor_id(self, instance):
        return instance.tutor.tutor_id
