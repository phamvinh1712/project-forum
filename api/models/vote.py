from django.db import models

class Vote(models.Model):
	user_id = models.ForeignKey(
		'user',
		on_delete=models.CASCADE
	)
	type = models.CharField(max_length=10)
	post_id = models.ForeignKey(
		'post',
		on_delete=models.CASCADE
	)
	comment_id = models.ForeignKey(
		'comment',
		on_delete=models.CASCADE
	)
	reply_id = models.ForeignKey(
		'reply',
		on_delete=models.CASCADE
	)
	create_time = models.DateField()