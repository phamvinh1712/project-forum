from rest_framework import serializers
from ..models import Reply
from ..serializers import UserDetailSerializer


class ReplySerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    up_vote_count = serializers.ReadOnlyField()
    down_vote_count = serializers.ReadOnlyField()

    class Meta:
        model = Reply
        fields = '__all__'


class CreateReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        exclude = ('user',)
