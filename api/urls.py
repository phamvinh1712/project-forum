from django.urls import include, path
from .views import HashtagListView

urlpatterns = [
    path('hashtags/', HashtagListView.as_view())
]
