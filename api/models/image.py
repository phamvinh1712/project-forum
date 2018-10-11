from django.db import models
from post.py import *
from comment.py import *
from reply.py import *

class Image(models.Model):
	url = models.URLField(max_length=200, blank=True)
	image = models.ImageField(height_field=100, width_field=100) #Change value of HEIGHT and WIDTH
	post = models.ForeignKey(Post, on_delete=CASCADE)
	comment = models.ManyToManyField(Comment, on_delete=CASCADE)
	reply = models.ManyToManyField(Reply, on_delete=CASCADE)