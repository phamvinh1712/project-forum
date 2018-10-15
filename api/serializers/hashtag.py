from rest_framework import serializers
from ..models import Hashtag


class HashtagListSerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()
    create_user = serializers.ReadOnlyField(source='create_user.username')

    class Meta:
        model = Hashtag
        fields = ('id', 'name', 'post_count', 'create_user', 'create_time')

    def get_post_count(self, obj):
        return obj.post_set.count()
