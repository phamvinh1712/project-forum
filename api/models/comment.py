from django.db import models
from user.py import *
from post.py import *

class Comment(models.Model):
	user = models.ForeignKey(Profile, on_delete=CASCADE)
	create_time = models.DateField()
	content = models.TextField()
	upvote = models.IntgerField()
	downvote = models.IntgerField()
	post = models.ForeignKey(Post, on_delete=CASCADE)
	user_display_name = models.CharField(50)