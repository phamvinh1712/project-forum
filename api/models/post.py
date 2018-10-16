from django.db import models
from django.contrib.auth.models import User
from .sub_thread import SubThread
from .hashtag import Hashtag
from datetime import datetime


class Post(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sub_thread = models.ForeignKey(SubThread, on_delete=models.CASCADE,related_name="post")
    view_count = models.IntegerField(default=0)
    create_time = models.DateTimeField(default=datetime.now)
    hashtags = models.ManyToManyField(Hashtag, blank=True)

    class Meta:
        ordering = ['-create_time', ]
