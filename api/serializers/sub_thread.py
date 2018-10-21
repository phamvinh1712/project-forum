from rest_framework import serializers
from ..models import SubThread


class SubThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubThread
        fields = "__all__"


class SubThreadCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubThread
        fields = ('id', 'sub_thread_title', 'description', 'display_flag', 'thread')


class SubThreadUpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubThread
        fields = ('id', 'display_order')
