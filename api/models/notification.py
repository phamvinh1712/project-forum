from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


class Notification(models.Model):
    content = models.CharField(max_length=200)
    type = models.CharField(max_length=10, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    send_time = models.DateTimeField(null=False, default=datetime.now)
    read_flag = models.BooleanField(default=False)

    class Meta:
        ordering = ['-send_time', ]
