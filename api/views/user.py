from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import UserDetailSerializer
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAdminUser
from rest_framework import status


class UserDetailView(APIView):
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

class UpdateUser(APIView):

   def post(self,request):
       user = request.user
       profile = user.profile
       profile.bio = request.data['bio']
       profile.birthday = request.data['birthday']
       profile.phone_nunmber = request.data['phone_number']
       profile.avatar = request.FILES.get('avatar')
       profile.save()
       
       first_name = request.data['first_name']
       user.first_name = first_name
       last_name = request.data['last_name']
       user.last_name = last_name
       email = request.data['email']
       user.email = email
       user.save()
       return Response(UserDetailSerializer(user).data, status=status.HTTP_200_OK)
