from rest_framework import serializers
from ..models import Post
from ..serializers import UserDetailSerializer, HashtagListSerializer


class ListPostSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    hashtags = HashtagListSerializer(many=True)

    class Meta:
        model = Post
        fields = '__all__'
