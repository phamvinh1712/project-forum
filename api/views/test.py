from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def test_send_mail(request):
    send_mail(
        'Subject here',
        'Here is the message.',
        'team4vgu@gmail.com',
        ['haphan613@gmail.com'],
        fail_silently=False,
    )
    return Response({"message": "Hello, world!"})
