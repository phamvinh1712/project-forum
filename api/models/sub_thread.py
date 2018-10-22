from django.db import models
from django.contrib.auth.models import User
from .thread import Thread


class SubThread(models.Model):
    sub_thread_title = models.CharField(max_length=50)
    description = models.CharField(max_length=250, blank=True)

    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name='sub_thread')
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    create_time = models.DateTimeField()
    display_order = models.SmallIntegerField(null=False, unique=True)
    display_flag = models.BooleanField()

    class Meta:
        ordering = ['display_order', ]
