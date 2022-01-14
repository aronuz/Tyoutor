from django.conf import settings
from django.db import models
from core.models import TimeStampedModel


class Tutor(TimeStampedModel):
    tutor_id = models.CharField(
        db_index=True, max_length=10, editable=False, unique=True)
    tutor_user = models.ForeignKey(settings.AUTH_USER_MODEL,
                                   on_delete=models.CASCADE, related_name="tutors")
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    description = models.TextField(blank=True, null=True)
    hourly_rate = models.FloatField()

    def __str__(self):
        return '{} {}'.format(self.first_name, self.last_name)


class Area(TimeStampedModel):
    area_id = models.TextField(db_index=True, max_length=60, editable=False)
    tutor = models.ForeignKey(
        Tutor, to_field='tutor_id', on_delete=models.CASCADE, related_name="areas")
    area = models.CharField(max_length=50)

    def __str__(self):
        return '{}, {} {}'.format(self.area, self.tutor.first_name, self.tutor.last_name)


class Request(TimeStampedModel):
    request_id = models.TextField(db_index=True, max_length=60, editable=False)
    tutor = models.ForeignKey(
        Tutor, to_field='tutor_id', on_delete=models.CASCADE, related_name="requests")
    email = models.CharField(max_length=50)
    message = models.TextField()

    def __str__(self):
        full_name = '{} {}'.format(self.tutor.first_name, self.tutor.last_name)
        return '{}, {}, {}'.format(self.message, self.email, full_name)


class Contact(TimeStampedModel):
    address = models.CharField(max_length=50)
    phone = models.CharField(max_length=10)

    def __str__(self):
        return '{}, {}'.format(self.address, self.phone)
