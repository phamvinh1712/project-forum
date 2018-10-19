from rest_framework.views import APIView
from ..serializers import VoteSerializer, PostDetailSerializer,CommentSerializer
from ..models import Vote
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


class VotePostView(APIView):
    permission_classes = IsAuthenticated,

    def post(self, request):
        serializer = VoteSerializer(data=request.data)
        if serializer.is_valid():
            type = serializer.validated_data['type']
            post = serializer.validated_data['post']

            vote = Vote.objects.filter(user=request.user, post=post).first()
            if vote is None:
                vote = Vote(user=request.user, post=post, type=type)
            else:
                vote.type = type
            vote.save()

            return Response(PostDetailSerializer(vote.post).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VoteCommentView(APIView):
    permission_classes = IsAuthenticated,

    def post(self, request):
        serializer = VoteSerializer(data=request.data)
        if serializer.is_valid():
            type = serializer.validated_data['type']
            comment = serializer.validated_data['comment']

            vote = Vote.objects.filter(user=request.user, comment=comment).first()
            if vote is None:
                vote = Vote(user=request.user, comment=comment, type=type)
            else:
                vote.type = type
            vote.save()

            return Response(CommentSerializer(vote.comment).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VoteReplyView(APIView):
    permission_classes = IsAuthenticated,

    def post(self, request):
        serializer = VoteSerializer(data=request.data)
        if serializer.is_valid():
            type = serializer.validated_data['type']
            reply = serializer.validated_data['reply']

            vote = Vote.objects.filter(user=request.user, reply=reply).first()
            if vote is None:
                vote = Vote(user=request.user, reply=reply, type=type)
            else:
                vote.type = type
            vote.save()

            return Response(CommentSerializer(vote.reply.comment).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
