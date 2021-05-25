# from django.shortcuts import render, redirect, get_object_or_404
# from django.views.decorators.http import require_GET, require_POST, require_http_methods

from .models import Poster, Movie
from .serializers import PosterSerializer

import json
import requests
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

# from rest_framework.decorators import authentication_classes, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework_jwt.authentication import JSONWebTokenAuthentication


# # Create your views here.
# @require_GET
# def index(request):
#     movies = Movie.objects.all()
#     context = {
#         'movies': movies,
#     }
#     return render(request, 'movies/index.html', context)


# @require_GET
# def detail(request, movie_pk):
#     movie = get_object_or_404(Movie, pk=movie_pk)
#     context = {
#         'movie': movie,
#     }
#     return render(request, 'movies/detail.html', context)


# @require_GET
# def recommended(request):
#     recent_movies = Movie.objects.order_by('-release_date')[:5]
#     popularity_movies = Movie.objects.order_by('-popularity')[:5]
#     vote_movies = Movie.objects.order_by('-vote_count')[:5]

#     context = {
#         'recent_movies': recent_movies,
#         'popularity_movies': popularity_movies,
#         'vote_movies': vote_movies,
#     }
#     return render(request, 'movies/recommended.html', context)

@api_view(['POST','GET'])
def poster(request):
    # POST 요청일 때
    NAVER_URL = 'https://openapi.naver.com/v1/search/movie.json'
    secret_key = json.loads(open('secrets.json').read())
    naver_key = secret_key['VUE_APP_NAVER_API_KEY']
    naver_pw = secret_key['VUE_APP_NAVER_API_PW']
    headers = {
      'X-Naver-Client-Id': naver_key,
      'X-Naver-Client-Secret': naver_pw,
    }

    if request.method == 'POST':
        serializer = PosterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            params = {
                'query': serializer.data["poster_title"],
            }
            result = requests.get(NAVER_URL,params=params,headers=headers)
            json_data = result.json()
            get_poster = json_data['items']
            # print(get_poster)
            # print(result.status_code)
            return Response(get_poster,status=200)
    elif request.method == 'GET':
        print(json.dumps(secret_key))
        print(naver_key, naver_pw)
        posters = Poster.objects.all()
        serializer = PosterSerializer(posters, many=True)
        return Response(serializer.data)