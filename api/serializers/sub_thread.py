from rest_framework import serializers
from ..models import SubThread
from ..models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class SubThreadSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True)

    class Meta:
        model = SubThread
        fields = ('description', ' sub_thread_title', 'posts')


