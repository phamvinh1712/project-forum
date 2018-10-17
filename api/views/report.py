from rest_framework import generics
from ..serializers import ReportListSerializer
from ..models import Report


class RepostListView(generics.ListAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListSerializer

    def post(self, req):
    	Report(create_time=req.POST.get('text')).save()
    	redirect('/')
