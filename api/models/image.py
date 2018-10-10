from django.db import models

class Image(models.Model):
	url = models.CharField(max_length=100)
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