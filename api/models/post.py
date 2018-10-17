from django.db import models
from django.contrib.auth.models import User
from .sub_thread import SubThread
from .hashtag import Hashtag
<<<<<<< HEAD
=======
from datetime import datetime
>>>>>>> 3d9facaf0944628c49b0f95d1d8ee50816f3364b


class Post(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
<<<<<<< HEAD
    sub_thread = models.ForeignKey(SubThread, on_delete=models.CASCADE)
    view_count = models.IntegerField()
    create_time = models.DateTimeField()
    hashtags = models.ManyToManyField(Hashtag)
=======
    sub_thread = models.ForeignKey(SubThread, on_delete=models.CASCADE,related_name="post")
    view_count = models.IntegerField(default=0)
    create_time = models.DateTimeField(default=datetime.now)
    hashtags = models.ManyToManyField(Hashtag, blank=True)
>>>>>>> 3d9facaf0944628c49b0f95d1d8ee50816f3364b

    class Meta:
        ordering = ['-create_time', ]
