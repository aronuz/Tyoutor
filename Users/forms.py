from django.forms import models
from django_registration.forms import RegistrationForm
from Users.models import CustomUser


class CustomUserForm(RegistrationForm):
    class Meta(RegistrationForm.Meta):
        model = CustomUser
