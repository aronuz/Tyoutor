from django.contrib.auth.models import AbstractUser

# from django.db import models
# from django.utils.translation import ugettext_lazy as _

class CustomUser(AbstractUser):
    pass

    # email = models.EmailField(_('email address'), unique=True)

    # USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = []

    # objects = CustomUserManager()

    # def __str__(self):
    #     return self.email