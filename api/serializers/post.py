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
    up_vote_count = serializers.ReadOnlyField()
    down_vote_count = serializers.ReadOnlyField()

    class Meta:
        model = Post
        fields = '__all__'