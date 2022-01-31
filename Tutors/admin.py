from django.contrib import admin

from Tutors.models import Contact, Tutor, Area, Request, PhotoUpload


class AreaAdmin(admin.ModelAdmin):
    list_display = ['area', 'tutor']


class RequestAdmin(admin.ModelAdmin):
    list_display = ['message', 'email', 'tutor']


class ContactAdmin(admin.ModelAdmin):
    list_display = ['address', 'phone']


class PhotoAdmin(admin.ModelAdmin):
    list_display = ['type', 'title']


admin.site.register(Tutor)
admin.site.register(Area, AreaAdmin)
admin.site.register(Request, RequestAdmin)
admin.site.register(Contact, ContactAdmin)
admin.site.register(PhotoUpload, PhotoAdmin)
