from rest_framework import generics
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from ..models import Post
from ..serializers import PostSerializer

class PostView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

def delete_post(req, id):
		instance = Post.objects.get(pk=id)
		#instance = get_object_or_404(Post, id=id)
		instance.delete()