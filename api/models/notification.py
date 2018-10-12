from django.db import models
from .user import Profile


class Notification(models.Model):
    content = models.CharField(max_length=50)
    type = models.CharField(max_length=10)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    send_time = models.DateTimeField()
    read_flag = models.CharField(max_length=1)
