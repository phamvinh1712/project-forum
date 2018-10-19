from rest_framework import generics
from ..models import Post
from ..serializers import PostSerializer, PostDetailSerializer
from rest_framework.permissions import IsAuthenticated


class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = IsAuthenticated,
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DeletePost(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = IsAuthenticated,

class EditPostView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = IsAuthenticated,
<<<<<<< HEAD
    
class PostView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    
    def delete_post(id, req):
    	try:
    		req.method == 'POST':
    		Post(req.POST, id=id).delete()
    		console.log("Successful")
    	except Exception as e 
    		console.log(e)



=======


class PostView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
>>>>>>> a681c4027953fcfc298be3b784e6fce23f91d36e
