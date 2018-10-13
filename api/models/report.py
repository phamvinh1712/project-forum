from django.db import models
from .user import Profile
from .post import Post
from .comment import Comment
from .reply import Reply
from .hashtag import Hashtag
from datetime import datetime


class Report(models.Model):
    REPORT_TYPE = (
        ('SPAM', 'Spam'),
        ('LAN', 'Language violation'),
    )
    STATUS = {
        ('SOLVED', 'Report solved'),
        ('WAITING', 'Waiting')
    }
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    type = models.CharField(max_length=4, choices=REPORT_TYPE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    reply = models.ForeignKey(Reply, on_delete=models.CASCADE)
    hashtag = models.ForeignKey(Hashtag, on_delete=models.CASCADE)
    status = models.CharField(max_length=7, choices=STATUS)
    create_time = models.DateTimeField(default=datetime.now)

    class Meta:
        ordering = ['create_time', ]
