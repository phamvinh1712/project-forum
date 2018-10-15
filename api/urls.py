from django.urls import include, path
from .views import HashtagListView, UserDetailView, NotificationListView, RepostListView

urlpatterns = [
    path('hashtags/', HashtagListView.as_view()),
    path('user-detail/', UserDetailView.as_view()),
    path('notifications/', NotificationListView.as_view()),
    path('report/', RepostListView.as_view())
]
