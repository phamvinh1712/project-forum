from rest_framework import serializers
from ..models import Reply
from ..serializers import UserDetailSerializer


class ReplySerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()

    class Meta:
        model = Reply
        fields = '__all__'


class CreateReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        exclude = ('user',)