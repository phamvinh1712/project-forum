from rest_framework import generics
from ..models import Post
from ..serializers import ListPostSerializer
from rest_framework import pagination, filters


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


class HashtagListPostView(generics.ListAPIView):
    serializer_class = ListPostSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Post.objects.filter(hashtags=pk, sub_thread__display_flag=True, sub_thread__thread__display_flag=True)


class ListPostSearchView(generics.ListAPIView):
    serializer_class = ListPostSerializer
    filter_backends = (filters.SearchFilter,)
    pagination_class = StandardResultsSetPagination
    search_fields = ('title', '@content', 'hashtags__name')

    def get_queryset(self):
        return Post.objects.filter(sub_thread__display_flag=True, sub_thread__thread__display_flag=True)
