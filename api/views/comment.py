from rest_framework import generics, status
from ..models import Comment
from rest_framework.response import Response
from ..serializers import CreateCommentSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated


class CreateCommentView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CreateCommentSerializer
    permission_classes = IsAuthenticated,

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        content = serializer.validated_data['content']
        post = serializer.validated_data['post']

        comment = Comment(user=request.user, post=post, content=content)
        comment.save()

        return Response(CommentSerializer(comment).data, status.HTTP_200_OK)
