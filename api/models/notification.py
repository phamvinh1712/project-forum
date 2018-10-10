from django.db import models

class Notification(models.Model):
	content = models.CharField(max_length=50)
	noti_type = models.CharField(max_length=10)
	creator = models.ForeignKey(
		'user',
		on_delete=models.CASCADE
	)
	send_time = models.DateField()
	read_flag = models.CharField(max_length=1)