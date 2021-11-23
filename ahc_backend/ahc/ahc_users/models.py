from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, unique=True, related_name='profile', on_delete=models.CASCADE)
    profile_image = models.ImageField(blank=True, null=True)