from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import UserDetailSerializer


class UserDetailView(APIView):
    def get(self, request, format=None):
        user = request.user
        serializer = UserDetailSerializer(user)
        return Response(serializer.data)
