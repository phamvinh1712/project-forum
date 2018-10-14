from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from .notification import Notification


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    birthday = models.DateField(null=True, blank=True)
    bio = models.CharField(max_length=250, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    avatar = models.ImageField()

    def create_notification(self, content, type):
        notification = Notification.objects.create(content=content, type=type)
        notification.user = self.user
        notification.save()


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        profile, created = Profile.objects.get_or_create(user=instance)


post_save.connect(create_user_profile, sender=User)
