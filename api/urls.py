from django.urls import include, path, re_path
from .views import *

urlpatterns = [
    path('report/', RepostListView.as_view()),
]