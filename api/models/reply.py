from django.db import models
from django.contrib.auth.models import User
from .comment import Comment
from datetime import datetime


class Reply(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    create_time = models.DateField(default=datetime.now)
    content = models.TextField()

    @property
    def up_vote_count(self):
        from .vote import Vote
        return Vote.objects.filter(reply=self, type='UP').count()

    @property
    def down_vote_count(self):
        from .vote import Vote
        return Vote.objects.filter(reply=self, type='DOWN').count()
