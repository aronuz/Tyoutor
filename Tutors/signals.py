from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils.crypto import get_random_string

from .models import Tutor


@receiver(pre_save, sender=Tutor)
def set_tutor_id(sender, instance, *args, **kwargs):
    if instance and not instance.tutor_id:
        random_string = get_random_string(length=3)
        last_name = instance.last_name
        if len(last_name) < 5:
            n = 5 - len(last_name)
            last_name = instance.last_name + instance.last_name[0:n]
        short_name = '{}{}'.format(
            instance.first_name[0:1], last_name[0:5])
        instance.tutor_id = '{}-{}'.format(short_name, random_string)
