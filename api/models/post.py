from django.db import models
from user.py import *
from sub_thread import *

class Post(models.Model):
	title = models.CharField(max_length=50)
	content = models.TextField()
	user = models.ForeignKey(Profile, on_delete=CASCADE)
	sub_thread = models.ForeignKey(Sub_thread, on_delete=CASCADE)
	upvote = models.IntgerField()
	downvote = models.IntgerField()
	view_count = models.IntgerField()