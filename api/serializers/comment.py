from rest_framework import serializers
from ..models import Comment
from ..serializers import UserDetailSerializer


class CommentSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    up_vote_count = serializers.ReadOnlyField()
    down_vote_count = serializers.ReadOnlyField()

    class Meta:
        model = Comment
        fields = '__all__'


class CreateCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        exclude = ('user',)
