from rest_framework import permissions


class IsSelfOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.tutor == request.user or request.method in permissions.SAFE_METHODS
