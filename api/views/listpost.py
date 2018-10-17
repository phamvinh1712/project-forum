from rest_framework import generics
from ..models import Post
from ..serializers import ListPostSerializer
from rest_framework import pagination


class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000


class ListPostDetailView(generics.ListAPIView):
    serializer_class = ListPostSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Post.objects.filter(sub_thread=pk)
