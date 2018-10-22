from rest_framework.views import APIView
from rest_framwork import generics
from rest_framework.response import Response
from ..serializers import UserDetailSerializer,ProfileSerializer
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAdminUser
from rest_framework import status,serializers
from rest_framework import generics
from ..models import user

class UserDetailView(generics.ListAPIView):
    def get(self, request, format=None):
        user = request.user
        serializer = UserDetailSerializer(user)
        return Response(serializer.data)


class UserSetActiveView(APIView):
    permission_classes = IsAdminUser,

    def post(self, request):
        user = get_object_or_404(User, pk=request.data['id'])
        if user.is_staff:
            return Response({'detail': 'Cannot disable admin user'}, status=status.HTTP_400_BAD_REQUEST)
        user.is_active = not user.is_active
        user.save()
        return Response(UserDetailSerializer(user).data, status=status.HTTP_200_OK)


class UserSetAdminView(APIView):
    permission_classes = IsAdminUser,

    def post(self, request):
        user = get_object_or_404(User, pk=request.data['id'])
        if not user.is_active:
            return Response({'detail': 'Cannot make disabled user admin'}, status=status.HTTP_400_BAD_REQUEST)
        user.is_staff = True
        user.save()
        return Response(UserDetailSerializer(user).data, status=status.HTTP_200_OK)

class UpdateUser(generics.CreateAPIViews):
    queryset = user.objects.all()
    serializer_class = ProfileSerializer