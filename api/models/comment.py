from django.db import models
from .user import Profile
from .post import Post
from datetime import datetime


class Comment(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    create_time = models.DateTimeField(default=datetime.now)
    content = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
