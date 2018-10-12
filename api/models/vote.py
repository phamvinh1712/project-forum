from django.db import models
from user.py import *
from post.py import *
from comment.py import *
from reply.py import *

class Vote(models.Model):
	user = models.ForeignKey(Profile, on_delete=CASCADE)
	type = models.CharField(max_length=10)
	post = models.ForeignKey(Post, on_delete=CASCADE)
	comment = models.ForeignKey(Comment, on_delete=CASCADE)
	reply = models.ForeignKey(Reply, on_delete=CASCADE)
	create_time = models.DateField()