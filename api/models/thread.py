from django.db import models
from user.py import *

class Thread(models.Model):
	title = models.CharField(max_length=50)
	description = models.CharField(max_length=250, blank=True)
	user = models.ForeignKey(Profile, on_delete=models.CASCADE)
	create_time = models.DateField()
	display_order = models.SmallIntegerField()
	display_flag = models.CharField(max_length=1)