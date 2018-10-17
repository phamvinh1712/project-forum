from rest_framework import generics
from ..models import Post
from ..serializers import PostSerializer
from rest_framework import pagination


class PostDetailView(generics.ListAPIView):
    serializer_class = PostSerializer
    pagination_class = pagination.LimitOffsetPagination

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Post.objects.filter(sub_thread=pk)
