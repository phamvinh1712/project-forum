from rest_auth.registration.serializers import RegisterSerializer, VerifyEmailSerializer
from rest_auth.registration.views import RegisterView, APIView
from rest_framework import serializers
from rest_framework import status
from allauth.account.views import ConfirmEmailView
from rest_framework.response import Response


class EmailConfirmView(APIView, ConfirmEmailView):
    def get_serializer(self, *args, **kwargs):
        return VerifyEmailSerializer(*args, **kwargs)

    def get(self, request,key, *args, **kwargs):
        serializer = self.get_serializer(data={'key': key})
        serializer.is_valid(raise_exception=True)
        self.kwargs['key'] = serializer.validated_data['key']
        confirmation = self.get_object()
        confirmation.confirm(self.request)
        return Response({'detail': ('ok')}, status=status.HTTP_200_OK)


class NameRegistrationSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)

    def custom_signup(self, request, user):
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        user.save(update_fields=['first_name', 'last_name'])


class NameRegistrationView(RegisterView):
    serializer_class = NameRegistrationSerializer
