from rest_framework import generics
from ..serializers import ReportListSerializer
from ..models import Report


class RepostListView(generics.ListAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListSerializer

