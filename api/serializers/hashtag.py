from rest_framework import serializers
from ..models import Hashtag


class HashtagListSerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()

    class Meta:
        model = Hashtag
        fields = ('id', 'name', 'post_count')

    def get_post_count(self, obj):
        return obj.post_set.count()
