from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # You can add additional fields here if needed
    icon = models.ImageField(
        upload_to='user_icons/',
        blank=True,
        null=True,
        default='user_icons/default-icon.png'
    )
    gender = models.CharField(max_length=10, null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)