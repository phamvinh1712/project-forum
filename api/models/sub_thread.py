from django.db import models

class Sub_thread(models.Model):
	sub_thread_title = models.CharField(max_length=50)
	description = models.CharField(max_length=250)
	thread_id = models.ForeignKey(
		'thread',
		on_delete=models.CASCADE
	)
	creator = models.ForeignKey(
		'user',
		on_delete=models.CASCADE
	)
	create_time = models.DateField()
	display_order = models.SmallIntegerField()
	display_flag = models.CharField(max_length=1)