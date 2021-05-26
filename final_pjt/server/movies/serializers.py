from rest_framework import serializers
from .models import Poster,Recommend


class PosterSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Poster
        fields = '__all__'


class RecommendSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Recommend
        fields = '__all__'


