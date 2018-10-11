from django.urls import include, path
from .views import test

urlpatterns = [
   path('testMail', test.test_send_mail)
]