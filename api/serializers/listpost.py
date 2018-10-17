from rest_framework import serializers
from ..models import Post
from ..serializers import UserDetailSerializer


class ListPostSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()

    class Meta:
        model = Post
        fields = '__all__'
