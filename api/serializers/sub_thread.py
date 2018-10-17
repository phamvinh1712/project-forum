from rest_framework import serializers
from ..models import SubThread
from ..models import Post
from ..serializers import UserDetailSerializer


class SubThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubThread
        fields = ('description', 'sub_thread_title')
