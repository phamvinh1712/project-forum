from django.db import models
from django.contrib.auth.models import User
from .sub_thread import SubThread
from .hashtag import Hashtag


class Post(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sub_thread = models.ForeignKey(SubThread, on_delete=models.CASCADE)
    view_count = models.IntegerField()
    create_time = models.DateTimeField()
    hashtags = models.ManyToManyField(Hashtag)

    class Meta:
        ordering = ['-create_time', ]
