from rest_framework import serializers
from ..models import Post
from .user import UserDetailSerializer
from .comment import CommentSerializer
from .hashtag import HashtagListSerializer


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        exclude = ('user',)


class PostDetailSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    comments = CommentSerializer(many=True)
    hashtags = HashtagListSerializer(many=True)

    class Meta:
        model = Post
        fields = '__all__'