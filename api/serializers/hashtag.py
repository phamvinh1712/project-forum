from rest_framework import serializers
from ..models import Hashtag


class HashtagListSerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()
<<<<<<< HEAD
    create_user = serializers.ReadOnlyField(source='create_user.user.username')
=======
    create_user = serializers.ReadOnlyField(source='create_user.username')
>>>>>>> 3d9facaf0944628c49b0f95d1d8ee50816f3364b

    class Meta:
        model = Hashtag
        fields = ('id', 'name', 'post_count', 'create_user', 'create_time')

    def get_post_count(self, obj):
        return obj.post_set.count()
