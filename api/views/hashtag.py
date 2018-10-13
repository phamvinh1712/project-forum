from rest_framework import generics
from ..models import Hashtag
from ..serializers import HashtagListSerializer


class HashtagListView(generics.ListAPIView):
    queryset = Hashtag.objects.all()
    serializer_class = HashtagListSerializer



