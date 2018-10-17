from ..models import Profile
from ..serializers import ProfileSerializer
from rest_framework import generics

class UserListView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
