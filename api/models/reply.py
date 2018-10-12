from django.db import models
from user.py import *
from comment.py import *

class Reply(models.Model):
	comment = models.ForeignKey(Comment, on_delete=CASCADE)
	user = models.ForeignKey(Profile, on_delete=CASCADE)
	create_time = models.DateField()
	content = models.TextField()
	upvote = models.IntgerField()
	downvote = models.IntgerField()
	user_display_name = models.CharField(50)