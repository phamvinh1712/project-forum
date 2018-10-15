from rest_framework import serializers
from ..models import SubThread
from ..models import Post
from ..serializers import UserDetailSerializer


class PostSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()

    class Meta:
        model = Post
        fields = '__all__'


class SubThreadSerializer(serializers.ModelSerializer):
    post = PostSerializer(many=True)

    class Meta:
        model = SubThread
        fields = ('description', 'sub_thread_title', 'post')
