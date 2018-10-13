from django.db import models
from .user import Profile
from .comment import Comment
from datetime import datetime


class Reply(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    create_time = models.DateField(default=datetime.now)
    content = models.TextField()
