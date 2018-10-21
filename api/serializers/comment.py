from rest_framework import serializers
from ..models import Comment
from .user import UserDetailSerializer
from .reply import ReplySerializer


class CommentSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    up_vote_count = serializers.ReadOnlyField()
    down_vote_count = serializers.ReadOnlyField()
    reply_count = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = '__all__'

    def get_reply_count(self, obj):
        return obj.replies.count()


class CommentResponseSerializer(serializers.ModelSerializer):
    up_vote_count = serializers.ReadOnlyField()
    down_vote_count = serializers.ReadOnlyField()
    replies = ReplySerializer(many=True)


    class Meta:
        model = Comment
        fields = '__all__'


class CreateCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        exclude = ('user',)
