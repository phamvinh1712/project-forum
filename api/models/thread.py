from django.db import models
from .user import Profile


class Thread(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=250, blank=True)
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE)
    create_time = models.DateField()
    display_order = models.SmallIntegerField()
    display_flag = models.CharField(max_length=1)
