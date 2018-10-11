from django.db import models
from user.py import *

class Role(models.Model):
	user = models.ForeignKey(Profile, on_delete=models.CASCADE)
	role_code = models.CharField(max_length=10)