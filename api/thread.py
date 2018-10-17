from django.db import models
from django.contrib.auth.models import User


class Thread(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=250, blank=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    create_time = models.DateField()
    display_order = models.SmallIntegerField(null=False, unique=True)
    display_flag = models.BooleanField()

    class Meta:
        ordering = ['display_order', ]
