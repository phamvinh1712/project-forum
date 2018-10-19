from rest_framework import serializers
from ..models import Comment
from ..serializers import UserDetailSerializer


class CommentSerializer(serializers.ModelSerializer):
<<<<<<< HEAD
    user = UserDetailSerializer(read_only = True)
=======
    user = UserDetailSerializer(read_only=True)

>>>>>>> a681c4027953fcfc298be3b784e6fce23f91d36e
    class Meta:
        model = Comment
        fields = '__all__'

<<<<<<< HEAD
class CreateCommentSerializer(serializers.ModelSerializer):
    
=======

class CreateCommentSerializer(serializers.ModelSerializer):

>>>>>>> a681c4027953fcfc298be3b784e6fce23f91d36e
    class Meta:
        model = Comment
        exclude = ('user',)
