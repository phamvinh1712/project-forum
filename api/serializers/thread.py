from rest_framework import serializers
from ..models import Thread
<<<<<<< HEAD
from ..models import SubThread

class SubThreadSerializer(serializers.ModelSerializer):
	class Meta:
		model = SubThread
		fields = '__all__'

class ThreadSerializer(serializers.ModelSerializer):
	class Meta:
		model = Thread
		fields = '__all__'
=======


class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = '__all__'
>>>>>>> 3d9facaf0944628c49b0f95d1d8ee50816f3364b
