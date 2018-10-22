from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserDetailSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    full_name = serializers.CharField(source='get_full_name', read_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'profile', 'full_name', 'first_name', 'last_name', 'is_staff', 'is_active')


class UserUpdateSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ('email', 'profile', 'first_name', 'last_name')