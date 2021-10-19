from django.conf import settings
from django.db import models
from core.models import TimeStampedModel


class Tutor(TimeStampedModel):
    tutor = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="tutors")

    def __str__(self):
        return self.content
