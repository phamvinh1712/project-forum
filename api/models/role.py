from django.db import models

class Role(models.Model):
	user_id = models.ForeignKey(
		'user',
		on_delete=models.CASCADE
	)
	role_code = models.CharField(max_length=10)