from rest_framework import serializers
from ..models import Report
from ..serializers import UserDetailSerializer, HashtagListSerializer


class ReportListSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    hashtag = HashtagListSerializer()
    class Meta:
        model = Report
        fields  = '__all__'