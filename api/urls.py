from django.urls import include, path, re_path
from .views import *

urlpatterns = [
    #path('user/', ListPostDetailView.as_view()),
    path('post/', PostView.as_view()),
    path('post/<int:id>/delete', delete_post),
    #re_path(r'^post/(?P<pk>+)/delete/$', delete_post, name='delete_post'),
]