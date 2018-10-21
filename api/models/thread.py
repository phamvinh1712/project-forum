from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


class Thread(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=250, blank=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    create_time = models.DateTimeField(default=datetime.now)
    display_order = models.SmallIntegerField(default=0)
    display_flag = models.BooleanField()

    class Meta:
        ordering = ['display_order', ]
