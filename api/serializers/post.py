from rest_framework import serializers
from ..models import Post
from .user import UserDetailSerializer
from .comment import CommentSerializer


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        exclude = ('user',)
        
class PostDetailSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    comments = CommentSerializer(many=True)
    class Meta:
        model = Post
        fields = '__all__'

class PostReportSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    class Meta:
        model = Post
        fields = '__all__'
