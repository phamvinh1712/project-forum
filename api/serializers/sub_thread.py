from rest_framework import serializers
from ..models import SubThread
<<<<<<< HEAD

class SubThreadSerializer(serializers.ModelSerializer):
	class Meta:
		model = SubThread
		fields = "__all__"
=======
from ..models import Post
from ..serializers import UserDetailSerializer


class PostSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()

    class Meta:
        model = Post
        fields = '__all__'


class SubThreadSerializer(serializers.ModelSerializer):
    post = PostSerializer(many=True)

    class Meta:
        model = SubThread
        fields = "__all__"
>>>>>>> 3d9facaf0944628c49b0f95d1d8ee50816f3364b
