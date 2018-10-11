from django.urls import include, path, re_path
from .views import test, NameRegistrationView, null_view
from rest_auth.registration.views import VerifyEmailView
from allauth.account.views import confirm_email
from .views import HashtagListView, UserDetailView

urlpatterns = [
    path('testMail', test.test_send_mail),
    re_path(r'^rest-auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$', confirm_email,
            name='account_confirm_email'),
    re_path(r'^rest-auth/registration/account-confirm-email/', confirm_email,
            name='account_email_verification_sent'),
    path('rest-auth/', include('rest_auth.urls')),

    path('hashtags/', HashtagListView.as_view()),
    path('user-detail/', UserDetailView.as_view())
]
