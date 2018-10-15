from django.urls import include, path, re_path
from .views import test, NameRegistrationView,HashtagListView,UserDetailView,SubThreadDetailView
from allauth.account.views import confirm_email
from django.urls import include, path
from .views import HashtagListView, UserDetailView, NotificationListView

urlpatterns = [
    path('testMail', test.test_send_mail),
    re_path(r'^rest-auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$', confirm_email,
            name='account_confirm_email'),
    re_path(r'^rest-auth/registration/account-confirm-email/', confirm_email,
            name='account_email_verification_sent'),
    path('rest-auth/', include('rest_auth.urls')),

    re_path(r'^rest-auth/registration/$', NameRegistrationView.as_view(), name="rest_name_register"),
    path('accounts/', include('allauth.urls')),
    path('hashtags/', HashtagListView.as_view()),
    path('user-detail/', UserDetailView.as_view()),
    re_path(r'^thread/(?P<pk>[0-9]+)/$', SubThreadDetailView.as_view(), name="subthread-detail"),
    path('notifications/', NotificationListView.as_view())
]
