from rest_framework import generics
from ..serializers import ReportListSerializer, ReportSerializer
from ..models import Report
from rest_framework.permissions import IsAuthenticated


class CreateReportView(generics.CreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class ReportListView(generics.ListAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListSerializer

class DeleteReport(generics.DestroyAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListSerializer
    permission_classes = IsAuthenticated,

