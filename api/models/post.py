from django.db import models
from .user import Profile
from .sub_thread import SubThread
from datetime import datetime


class Post(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    sub_thread = models.ForeignKey(SubThread, on_delete=models.CASCADE)
    upvote = models.IntegerField()
    downvote = models.IntegerField()
    view_count = models.IntegerField()
    create_time = models.DateTimeField()
