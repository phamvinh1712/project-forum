from django.db import models

class Post(models.Model):
	title = models.CharField(max_length=50)
	content = models.CharField(max_length=500)
	creator = models.ForeignKey(
		'user',
		on_delete=models.CASCADE
	)
	sub_thread_id = models.ForeignKey(
		'sub_thread',
		on_delete=models.CASCADE
	)
	upvote = models.IntgerField()
	downvote = models.IntgerField()
	view_count = models.IntgerField()