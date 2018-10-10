from django.db import models

class Reply(models.Model):
	comment_id = models.ForeignKey(
		'comment',
		on_delete=models.CASCADE
	)
	creator = models.ForeignKey(
		'user',
		on_delete=models.CASCADE
	)
	create_time = models.DateField()
	content = models.CharField(max_length=500)
	upvote = models.IntgerField()
	downvote = models.IntgerField()
	post_id = models.ForeignKey(
		'post',
		on_delete=models.CASCADE
	)
	user_display_name = models.CharField(50)