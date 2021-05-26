from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Like_movie

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password',)

class LikeSeriallizer(serializers.ModelSerializer):

    class Meta:
        model = Like_movie
        fields = ('id', 'title', 'movieid', 'poster',)