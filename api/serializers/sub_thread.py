from rest_framework import serializers
from ..models import SubThread
from ..models import Post
from ..serializers import UserDetailSerializer

class SubThreadSerializer(serializers.ModelSerializer):
	post = PostSerializer(many=True)
	
	class Meta:
		model = SubThread
		fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()

    class Meta:
        model = Post
        fields = '__all__'
