from django.db import models
from .user import Profile
from datetime import datetime


class Notification(models.Model):
    content = models.CharField(max_length=200)
    type = models.CharField(max_length=10)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    send_time = models.DateTimeField(null=False, default=datetime.now)
    read_flag = models.BooleanField()

    class Meta:
        ordering = ['-send_time', ]
