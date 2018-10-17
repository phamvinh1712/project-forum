<<<<<<< HEAD
from django.urls import include, path
from .views import HashtagListView, UserDetailView, NotificationListView, ThreadListView

urlpatterns = [
    path('hashtags/', HashtagListView.as_view()),
    path('user-detail/', UserDetailView.as_view()),
    path('notifications/', NotificationListView.as_view()),
=======
from django.urls import include, path, re_path
from .views import *
from rest_auth.registration.views import VerifyEmailView

urlpatterns = [
    re_path(r'^rest-auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$', EmailConfirmView.as_view(),
            name='account_confirm_email'),
    re_path(r'^rest-auth/registration/account-confirm-email/', VerifyEmailView.as_view(),
            name='account_email_verification_sent'),
    path('rest-auth/', include('rest_auth.urls')),

    re_path(r'^rest-auth/registration/$', NameRegistrationView.as_view(), name="rest_name_register"),
    path('hashtags/', HashtagListView.as_view()),
    path('user-detail/', UserDetailView.as_view()),
    re_path(r'^subthread/(?P<pk>[0-9]+)/$', SubThreadDetailView.as_view(), name="subthread-detail"),
    path('notifications/', NotificationListView.as_view()),
    path('create-post/', CreatePostView.as_view()),
    re_path(r'^posts/(?P<pk>[0-9]+)/$', PostView.as_view()),
>>>>>>> 3d9facaf0944628c49b0f95d1d8ee50816f3364b
    path('thread/', ThreadListView.as_view()),
]
