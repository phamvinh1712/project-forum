from rest_framework import serializers
from ..models import Thread
from ..models import SubThread

class SubThreadSerializer(serializers.ModelSerializer):
	class Meta:
		model = SubThread
		fields = '__all__'

class ThreadSerializer(serializers.ModelSerializer):
	class Meta:
		model = Thread
		fields = '__all__'