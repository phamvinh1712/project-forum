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
<<<<<<< HEAD
        exclude = ('user',)
=======
        exclude = ('user',)
>>>>>>> a681c4027953fcfc298be3b784e6fce23f91d36e
