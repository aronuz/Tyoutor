from typing import Sized
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from Users.models import CustomUser


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'is_staff']


admin.site.register(CustomUser, CustomUserAdmin)
