from django.db import models
from user.py import *
from thread.py import *

class Sub_thread(models.Model):
	sub_thread_title = models.CharField(max_length=50)
	description = models.CharField(max_length=250, blank=True)
	thread = models.ForeignKey(Thread, on_delete=CASCADE)
	user = models.ForeignKey(Profile, on_delete=CASCADE)
	create_time = models.DateField()
	display_order = models.SmallIntegerField()
	display_flag = models.CharField(max_length=1)