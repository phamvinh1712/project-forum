from django.db import models
from django.contrib.auth.models import User
from .comment import Comment
from datetime import datetime


class Reply(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    create_time = models.DateField(default=datetime.now)
    content = models.TextField()
