from django.urls import include, path
from .views import HashtagListView, UserDetailView

urlpatterns = [
    path('hashtags/', HashtagListView.as_view()),
    path('user-detail/', UserDetailView.as_view())
]
