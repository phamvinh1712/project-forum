from rest_framework import serializers
from ..models import Thread, SubThread


class SubThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubThread
        fields = "__all__"


class ThreadSerializer(serializers.ModelSerializer):
    sub_thread = SubThreadSerializer(many=True)

    class Meta:
        model = Thread
        fields = '__all__'


class ThreadCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = ('id', 'title', 'description', 'display_flag')


class ThreadUpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = ('id', 'display_order')

