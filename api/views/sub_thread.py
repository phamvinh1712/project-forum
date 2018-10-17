from rest_framework import generics
from rest_framework.response import Response
from ..models import SubThread
from ..serializers import SubThreadSerializer


class SubThreadDetailView(generics.RetrieveAPIView):
    serializer_class = SubThreadSerializer
    queryset = SubThread.objects.all()
