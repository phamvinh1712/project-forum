from rest_framework import generics
from ..models import Thread
from ..serializers import ThreadSerializer

<<<<<<< HEAD
=======

>>>>>>> 3d9facaf0944628c49b0f95d1d8ee50816f3364b
class ThreadListView(generics.ListAPIView):
    serializer_class = ThreadSerializer

    def get_queryset(self):
        return Thread.objects.all()