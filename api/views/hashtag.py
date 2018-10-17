from rest_framework import generics
from ..models import Hashtag
from ..serializers import HashtagListSerializer


class HashtagListView(generics.ListCreateAPIView):
    queryset = Hashtag.objects.all()
    serializer_class = HashtagListSerializer

    def perform_create(self, serializer):
<<<<<<< HEAD
        serializer.save(create_user=self.request.user)
=======
<<<<<<< HEAD
        serializer.save(create_user=self.request.user.profile)
=======
        serializer.save(create_user=self.request.user)
>>>>>>> 3d9facaf0944628c49b0f95d1d8ee50816f3364b
>>>>>>> Khoa



