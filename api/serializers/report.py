from rest_framework import serializers
from ..models import Report
from ..serializers import UserDetailSerializer


class ReportListSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    class Meta:
        model = Report
        fields  = '__all__'