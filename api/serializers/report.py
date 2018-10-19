from rest_framework import serializers
from ..models import Report
from .user import UserDetailSerializer
from .hashtag import HashtagListSerializer
from .comment import CommentSerializer
from .post import PostReportSerializer
class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        exclude = ('user',)
        
class ReportListSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    comment = CommentSerializer()
    hashtag = HashtagListSerializer()
    post = PostReportSerializer()
    class Meta:
        model = Report
        fields  = '__all__'

