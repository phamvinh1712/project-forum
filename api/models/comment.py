from django.db import models
from django.contrib.auth.models import User
from .post import Post
from datetime import datetime


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    create_time = models.DateTimeField(default=datetime.now)
    content = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
