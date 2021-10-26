from django.conf import settings
from django.db import models
from core.models import TimeStampedModel


class Tutors(TimeStampedModel):
    tutor_id = models.IntegerField(unique=True)
    tutor = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE, related_name="tutors")

    def __str__(self):
        return self.tutor.username


class Areas(TimeStampedModel):
    area_id = models.IntegerField(unique=True)
    tutor_id = models.ForeignKey(
        Tutors, on_delete=models.CASCADE, related_name="areas")        
    tutor = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE, related_name="areas")
    area = models.CharField(max_length=50)

    def __str__(self):
        return self.area
