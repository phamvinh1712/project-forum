from rest_framework import generics
from ..serializers import ReportListSerializer
from ..models import Report


class CreateReport():
    def createpost(self,req):
     if req.method == 'POST':
        Post = Report()
        Post.reason = req.POST.get('reason')
        Post.save()   

class RepostListView(generics.ListAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListSerializer
