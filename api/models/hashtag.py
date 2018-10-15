from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


class Hashtag(models.Model):
    name = models.CharField(max_length=20, unique=True, )
    create_time = models.DateTimeField(default=datetime.now)
    create_user = models.ForeignKey(User, on_delete=models.CASCADE)
