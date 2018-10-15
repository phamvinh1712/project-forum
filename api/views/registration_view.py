from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.registration.views import RegisterView
from rest_framework import serializers
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view()
def null_view(request):
    return Response(status=status.HTTP_400_BAD_REQUEST)


class NameRegistrationSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)

    def custom_signup(self, request, user):
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        user.save(update_fields=['first_name', 'last_name'])


class NameRegistrationView(RegisterView):
    serializer_class = NameRegistrationSerializer
