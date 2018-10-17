from rest_framework import generics
from ..models import SubThread
from ..serializers import SubThreadSerializer
from rest_framework import pagination


class SubThreadDetailView(generics.ListAPIView):
    serializer_class = SubThreadSerializer
    pagination_class = pagination.LimitOffsetPagination
    queryset = SubThread.objects.all()
