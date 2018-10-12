from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	birdthday = models.DateField(null=True, blank=True)
	bio = models.CharField(max_length=250, blank=True)
	phone_number = models.CharField(max_length=20, blank=True)
	avatar_url_path = models.URLField(max_length=200, blank=True)