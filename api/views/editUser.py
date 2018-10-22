from .models import User
from .serializers import UserSerializer
from rest_framework import generics

class EditUser(generics.UpdateAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	lookup_field = 'pk'