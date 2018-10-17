from rest_framework import serializers
from ..models import Post
from ..serializers import UserDetailSerializer


class PostSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()

    class Meta:
        model = Post
        fields = '__all__'
