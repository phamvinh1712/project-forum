from django.db import models
from user.py import *

class Notification(models.Model):
	content = models.CharField(max_length=50)
	noti_type = models.CharField(max_length=10)
	user = models.ForeignKey(Profile, on_delete=CASCADE)
	send_time = models.DateField()
	read_flag = models.CharField(max_length=1)