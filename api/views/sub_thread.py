from rest_framework import generics
from ..models import SubThread
from ..serializers import SubThreadSerializer, SubThreadCreateSerializer, SubThreadUpdateOrderSerializer
from rest_framework import pagination
from rest_framework.permissions import IsAdminUser
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


class SubThreadDetailView(generics.RetrieveAPIView):
    serializer_class = SubThreadSerializer
    pagination_class = pagination.LimitOffsetPagination
    queryset = SubThread.objects.all()


class SubThreadCreateView(generics.CreateAPIView):
    serializer_class = SubThreadCreateSerializer
    permission_classes = IsAdminUser,

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class SubThreadEditView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SubThread.objects.all()
    serializer_class = SubThreadCreateSerializer
    permission_classes = IsAdminUser,

class SubThreadUpdateOrderView(APIView):
    queryset = SubThread.objects.all()
    permission_classes = IsAdminUser,

    def post(self, request):
        serializer = SubThreadUpdateOrderSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        sub_thread_list = []
        for sub_thread in request.data:
            temp = get_object_or_404(SubThread, pk=sub_thread['id'])
            temp.display_order = sub_thread['display_order']
            temp.save()
            sub_thread_list.append(temp)
        serializer = SubThreadSerializer(sub_thread_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CountSubThread(APIView):
    def get(self,request):
        return Response(SubThread.objects.count())