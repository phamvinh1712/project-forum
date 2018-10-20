from rest_framework import generics
from rest_framework.views import APIView
from ..models import Thread
from ..serializers import ThreadSerializer, ThreadCreateSerializer, ThreadUpdateOrderSerializer,ThreadAdminSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


class ThreadListView(generics.ListAPIView):
    serializer_class = ThreadSerializer

    def get_queryset(self):
        return Thread.objects.filter(display_flag=True)


class ThreadAdminListView(generics.ListAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadAdminSerializer
    permission_classes = IsAdminUser,


class ThreadCreateView(generics.CreateAPIView):
    serializer_class = ThreadCreateSerializer
    permission_classes = IsAdminUser,

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class ThreadEditView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadCreateSerializer
    permission_classes = IsAdminUser,


class ThreadUpdateOrderView(APIView):
    queryset = Thread.objects.all()
    permission_classes = IsAdminUser,

    def post(self, request):
        serializer = ThreadUpdateOrderSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        thread_list = []
        for thread in request.data:
            temp = get_object_or_404(Thread, pk=thread['id'])
            temp.display_order = thread['display_order']
            temp.save()
            thread_list.append(temp)
        serializer = ThreadSerializer(thread_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
