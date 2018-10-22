from rest_framework import generics
from ..models import Hashtag
from ..serializers import HashtagListSerializer


class HashtagListView(generics.ListCreateAPIView):
    queryset = Hashtag.objects.all()
    serializer_class = HashtagListSerializer

    def perform_create(self, serializer):
        serializer.save(create_user=self.request.user.profile)
