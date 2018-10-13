from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserDetailSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('username', 'email', 'profile', 'full_name', 'first_name', 'last_name', 'is_staff', 'is_active')

    def get_full_name(self, obj):
        return obj.get_full_name()
