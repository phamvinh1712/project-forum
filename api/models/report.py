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
    user = models.ForeignKey(Profile)
    type = models.CharField(max_length=4, choices=REPORT_TYPE)
    post = models.ForeignKey(Post)
    comment = models.ForeignKey(Comment)
    reply = models.ForeignKey(Reply)
    hashtag = models.ForeignKey(Hashtag)
    status = models.CharField(max_length=7, choices=STATUS)
    create_time = models.DateTimeField(default=datetime.now)

    class Meta:
        ordering = ['create_time', ]
