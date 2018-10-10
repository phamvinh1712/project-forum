from django.db import models

class Person(models.Model):
	email = models.EmailField(max_length=50)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    birthday = models.DateField()
    bio = models.CharField(max_length=250)
    phone_number = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    avatar_url_path = models.CharField(max_length=50)