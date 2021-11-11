from django.contrib import admin

from Tutors.models import Tutor, Area, Request


class AreaAdmin(admin.ModelAdmin):
    list_display = ['area', 'tutor']

class RequestAdmin(admin.ModelAdmin):
    list_display = ['message', 'email', 'tutor']

admin.site.register(Tutor)
admin.site.register(Area, AreaAdmin)
admin.site.register(Request, RequestAdmin)
