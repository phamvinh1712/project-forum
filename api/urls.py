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
    re_path('report/', RepostListView.as_view()),       
    path('create-report/', CreateReport.createpost)   
]
