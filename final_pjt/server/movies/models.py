from django.db import models
from django.conf import settings

class Genre(models.Model):
    name = models.CharField(max_length=50)


class Movie(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.DateField()
    popularity = models.FloatField()
    vote_count = models.IntegerField()
    vote_average = models.FloatField()
    overview = models.TextField()
    poster_path = models.CharField(max_length=200)
    genres = models.ManyToManyField(Genre)


class Poster(models.Model):
    poster_title = models.CharField(max_length=300)


# Recommendation 기능 추가
class Recommend(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    recommend_poster = models.CharField(max_length=200)
    recommend_movieid = models.CharField(max_length=200)