from rest_framework import generics, status
from ..models import Reply
from rest_framework.response import Response
from ..serializers import ReplySerializer, CreateReplySerializer
from rest_framework.permissions import IsAuthenticated


class CreateReplyView(generics.CreateAPIView):
    queryset = Reply.objects.all()
    serializer_class = CreateReplySerializer
    permission_classes = IsAuthenticated,

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        content = serializer.validated_data['content']
        comment = serializer.validated_data['comment']

        reply = Reply(user=request.user, comment=comment, content=content)
        reply.save()

        return Response(ReplySerializer(reply).data, status.HTTP_200_OK)


class ReplyView(generics.ListCreateAPIView):
    serializer_class = ReplySerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Reply.objects.filter(comment=pk)

    def perform_create(self, serializer):
        pk = self.kwargs['pk']
        serializer.save(comment=pk, create_user=self.request.user)
