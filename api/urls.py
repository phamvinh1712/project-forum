from django.urls import include, path, re_path
from .views import test, NameRegistrationView, null_view,HashtagListView,UserDetailView
from rest_auth.registration.views import VerifyEmailView
from allauth.account.views import confirm_email

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
    path('user-detail/', UserDetailView.as_view())
]
