from django.db import models
from django.contrib.auth.models import User
from .post import Post
from .comment import Comment
from .reply import Reply


class Vote(models.Model):
    VOTE_TYPE = (
        ('UP', 'Up vote'),
        ('DOWN', 'Down vote')
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=2, choices=VOTE_TYPE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    reply = models.ForeignKey(Reply, on_delete=models.CASCADE)
    create_time = models.DateField()
