from django.db import models
from .user import Profile
from .post import Post


class Comment(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    create_time = models.DateTimeField()
    content = models.TextField()
    upvote = models.IntegerField()
    downvote = models.IntegerField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
