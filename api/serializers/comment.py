from rest_framework import serializers
from ..models import Comment
from ..serializers import UserDetailSerializer


class CommentSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    class Meta:
        model = Comment
        fields = '__all__'
