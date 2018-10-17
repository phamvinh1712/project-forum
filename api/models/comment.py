from django.db import models
from django.contrib.auth.models import User
from .post import Post
from datetime import datetime


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    create_time = models.DateTimeField(default=datetime.now)
    content = models.TextField()
<<<<<<< HEAD
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
=======
<<<<<<< HEAD
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
=======
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
>>>>>>> 3d9facaf0944628c49b0f95d1d8ee50816f3364b
>>>>>>> Khoa
