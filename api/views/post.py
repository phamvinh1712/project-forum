from rest_framework import generics, serializers
from ..models import Post
from ..serializers import PostSerializer, PostDetailSerializer
from rest_framework.permissions import IsAuthenticated, BasePermission
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


class IsUser(BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.user:
            if request.user.is_staff:
                return True
            else:
                return obj.user == request.user
        else:
            return False


class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = IsAuthenticated,

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DeletePost(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = IsUser,

    def delete_post(req, id):
        instance = Post.objects.get(pk=id)
        instance.delete()


class EditPostView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = IsUser,


class PostView(APIView):

    def get(self, request,pk):
        post = get_object_or_404(Post, pk=pk)
        if post.sub_thread.display_flag is False or post.sub_thread.thread.display_flag is False:
            return Response(status=status.HTTP_404_NOT_FOUND)
        post.view_count = post.view_count + 1
        post.save()
        return Response(PostDetailSerializer(post).data, status=status.HTTP_200_OK)


class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    content = serializers.CharField(max_length=250)


class SendMail(APIView):
    def post(self, request):
        serializer = EmailSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']
            content = serializer.validated_data['content']
            send_mail(
                'Project forum',
                content,
                'team4vgu@gmail.com',
                [email],
                fail_silently=False,
            )
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CountPost(APIView):
    def get(self,request):
        return Response(Post.objects.count())
