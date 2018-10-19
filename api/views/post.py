from rest_framework import generics
from ..models import Post
from ..serializers import PostSerializer, PostDetailSerializer
from rest_framework.permissions import IsAuthenticated


class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = IsAuthenticated,
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DeletePost(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = IsAuthenticated,

class EditPostView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = IsAuthenticated,


class PostView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
