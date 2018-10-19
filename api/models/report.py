from django.db import models
from django.contrib.auth.models import User
from .post import Post
from .comment import Comment
from .reply import Reply
from .hashtag import Hashtag
from datetime import datetime


class Report(models.Model):
    STATUS = {
        ('SOLVED', 'Report solved'),
        ('WAITING', 'Waiting')
    }
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    reason = models.CharField(max_length=250,null = True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True)
    reply = models.ForeignKey(Reply, on_delete=models.CASCADE, null=True)
    hashtag = models.ForeignKey(Hashtag, on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=7, choices=STATUS)
    create_time = models.DateTimeField(default=datetime.now)

    class Meta:
        ordering = ['create_time', ]
