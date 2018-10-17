from rest_framework import generics
from ..serializers import ReportListSerializer
from ..models import Report


class CreateReport():
    def createpost(req):
     if req.method == 'POST':
         Post = Report()       
         if req.POST.get('comment'):
            Post.comment = req.POST.get('comment')
         if req.POST.get('hashtag'):
            Post.hashtag = req.POST.get('hashtag')
         if req.POST.get('post'):
            Post.post = req.POST.get('post')
         if req.POST.get('reply'):
            Post.reply = req.POST.get('reply')
         Post.user = req.POST.get('user')
         Post.create_time = req.POST.get('create_time')   
         Post.reason = req.POST.get('reason')
         Post.save()   

class RepostListView(generics.ListAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListSerializer
