from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.base import Model

class User(AbstractUser):
    pass


class Like_movie(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    movieid = models.CharField(max_length=200)
    poster = models.CharField(max_length=200)
    # liked = models.BooleanField(default=False)

    def __str__(self):
        return self.title