from django.db import models
from .user import Profile


class Hashtag(models.Model):
    name = models.CharField(max_length=20, unique=True, )
    create_time = models.DateTimeField()
    create_user = models.ForeignKey(Profile, on_delete=models.CASCADE)
