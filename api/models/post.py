from django.db import models
from django.contrib.auth.models import User
from .sub_thread import SubThread
from .hashtag import Hashtag
from datetime import datetime


class Post(models.Model):
    title = models.CharField(max_length=50, null = True)
    content = models.TextField( null = True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null = True)
    sub_thread = models.ForeignKey(SubThread, on_delete=models.CASCADE,related_name="post", null = True)
    view_count = models.IntegerField(default=0, null = True)
    create_time = models.DateTimeField(default=datetime.now, null = True)
    hashtags = models.ManyToManyField(Hashtag, blank=True) 

    class Meta:
        ordering = ['-create_time', ]
