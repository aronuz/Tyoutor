from django.conf import settings
from django.db import models
from core.models import TimeStampedModel


class Tutors(TimeStampedModel):
    tutor_id = models.IntegerField(unique=True)
    tutor_user = models.ForeignKey(settings.AUTH_USER_MODEL,
                                   on_delete=models.CASCADE, related_name="tutors")
    description = models.TextField(blank=True, null=True)
    hourlyRate = models.FloatField()

    def __str__(self):
        return '{} {}'.format(self.tutor_user.first_name, self.tutor_user.last_name)


class Areas(TimeStampedModel):
    area_id = models.TextField(unique=True)
    tutor = models.ForeignKey(
        Tutors, on_delete=models.CASCADE, related_name="areas")
    area = models.CharField(max_length=50)

    def __str__(self):
        return self.area


class Requests(TimeStampedModel):
    request_id = models.TextField(unique=True)
    tutor = models.ForeignKey(
        Tutors, on_delete=models.CASCADE, related_name="requests")
    email = models.CharField(max_length=50)
    message = models.TextField()

    def __str__(self):
        return '{} from {}'.format(self.message, self.email)
