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
    path('notifications/', NotificationListView.as_view()),

        #API for report
    path('create-report/',CreateReportView.as_view()),
    re_path('report/', ReportListView.as_view() ),
    re_path(r'^reports/delete/(?P<pk>[0-9]+)/$',DeleteReport.as_view()),
        #API for post (GET, PUT, POST, DELETE)
    path('create-post/', CreatePostView.as_view()),
    re_path(r'^posts/(?P<pk>[0-9]+)/$', PostView.as_view()),
    path('threads/', ThreadListView.as_view()),
    re_path(r'^posts/delete/(?P<pk>[0-9]+)/$', DeletePost.as_view()),
    re_path(r'^subthread/(?P<pk>[0-9]+)/$', SubThreadDetailView.as_view(), name="subthread-detail"),
    re_path(r'^subthread/(?P<pk>[0-9]+)/posts/$', ListPostDetailView.as_view(), name="postlist-detail"),
    re_path(r'^comments/(?P<pk>[0-9]+)/replies/$', ReplyView.as_view()),
    path('create-comment/', CreateCommentView.as_view()),
    path('create-reply/', CreateReplyView.as_view()),
    re_path(r'^edit-post/(?P<pk>[0-9]+)/$', EditPostView.as_view()),
    path('vote-post/', VotePostView.as_view()),
    path('vote-comment/', VoteCommentView.as_view()),
    path('vote-reply/', VoteReplyView.as_view()),
    path('set-user-active/', UserSetActiveView.as_view()),
    path('set-user-admin/', UserSetActiveView.as_view()),
    path('create-thread/', ThreadCreateView.as_view()),
    path('create-subthread/',SubThreadCreateView.as_view()),
    re_path(r'^threads/(?P<pk>[0-9]+)/$', ThreadEditView.as_view()),
    re_path(r'^sub-threads/(?P<pk>[0-9]+)/$', SubThreadEditView.as_view()),
    path('update-thread-order/', ThreadUpdateOrderView.as_view()),
    path('update-sub-thread-order/', SubThreadUpdateOrderView.as_view()),
]
