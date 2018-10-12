from django.db import models
from .user import Profile
from .post import Post


class Hashtag(models.Model):
    name = models.CharField(max_length=20)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    create_time = models.DateTimeField()
    create_user = models.ForeignKey(Profile, on_delete=models.CASCADE)
