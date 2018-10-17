from rest_framework import serializers
from ..models import SubThread


class SubThreadSerializer(serializers.ModelSerializer):

    class Meta:
        model = SubThread
        fields = "__all__"
