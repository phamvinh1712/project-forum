from rest_framework import generics
<<<<<<< HEAD
from ..models import SubThread
from ..serializers import SubThreadSerializer
from rest_framework import pagination


class SubThreadDetailView(generics.ListAPIView):
    serializer_class = SubThreadSerializer
    pagination_class = pagination.LimitOffsetPagination
=======
from rest_framework.response import Response
from ..models import SubThread
from ..serializers import SubThreadSerializer


class SubThreadDetailView(generics.RetrieveAPIView):
    serializer_class = SubThreadSerializer
>>>>>>> Khoa
    queryset = SubThread.objects.all()
