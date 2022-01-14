from rest_framework import serializers

from Tutors.models import Tutor, Area, Request, Contact


class TutorSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    tutorId = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    areas = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    hourlyRate = serializers.SerializerMethodField()

    class Meta:
        model = Tutor
        exclude = ["id", "tutor_id", "tutor_user", "updated_at"]

    def get_tutorId(self, instance):
        return instance.tutor_id

    def get_created_at(self, instance):
        return instance.created_at.strftime("%B %d, %Y")

    def get_full_name(self, instance):
        return '{} {}'.format(instance.first_name, instance.last_name)

    def get_email(self, instance):
        return instance.tutor_user.email

    def get_hourlyRate(self, instance):
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
        model = Area
        exclude = ["id", "tutor", "updated_at"]

    def get_created_at(self, instance):
        return instance.created_at.strftime("%B %d, %Y")

    def get_tutor_id(self, instance):
        return instance.tutor.tutor_id


class RequestSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    email = serializers.StringRelatedField()
    request_id = serializers.StringRelatedField
    message = serializers.StringRelatedField()
    tutor_id = serializers.SerializerMethodField()

    class Meta:
        model = Request
        exclude = ["id", "tutor", "updated_at"]

    def get_created_at(self, instance):
        return instance.created_at.strftime("%B %d, %Y")

    def get_tutor_id(self, instance):
        return instance.tutor.tutor_id


class ContactSerializer(serializers.ModelSerializer):
    area = serializers.StringRelatedField()

    class Meta:
        model = Contact
        exclude = ["id", "created_at", "updated_at"]