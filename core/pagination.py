from collections import OrderedDict
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


class PageNumberPaginationNoCount(PageNumberPagination):
    def get_paginated_response(self, data):
        return Response(
            OrderedDict([
                ('next', self.get_next_link()),
                ('previous', self.get_previous_link()),
                ('results', data)
            ])
        )


class TutorPagination(PageNumberPagination):
    page_size = 10


class AreaPagination(PageNumberPagination):
    page_size = 15


class RequestPagination(PageNumberPagination):
    page_size = 5