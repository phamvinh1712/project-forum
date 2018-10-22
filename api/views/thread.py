from rest_framework import generics
from ..models import Thread
from ..serializers import ThreadSerializer

class ThreadListView(generics.ListAPIView):
    serializer_class = ThreadSerializer

    def get_queryset(self):
        return Thread.objects.all()
