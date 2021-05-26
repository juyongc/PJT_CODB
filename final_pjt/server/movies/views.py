from .models import Poster, Movie
from .serializers import PosterSerializer
import json, html
import requests
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

# from rest_framework.decorators import authentication_classes, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework_jwt.authentication import JSONWebTokenAuthentication


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
    TMDB_URL = 'https://api.themoviedb.org/3/search/movie'

    if request.method == 'POST':
        serializer = PosterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            # 네이버 API 사용 => 영어 타이틀 추출
            params = {
                'query': serializer.data["poster_title"],
            }
            result = requests.get(NAVER_URL,params=params,headers=headers)
            json_data = result.json()
            get_poster = json_data['items']
            engtitle = json_data['items'][0]['subtitle']
            engtitle = html.unescape(engtitle)
            engtitle = engtitle.replace('<b>', '')
            engtitle = engtitle.replace('</b>', '')
            # engtitle = engtitle.replace('&amp;','&')
            # print(engtitle)
            # print(result.status_code)

            # TMDB API 사용 => 데이터 추출
            tmdb_params = {
                'api_key': '7ecf0fa910e1bacb146ddf503cf3ec72',
                'language': 'ko-KR',
                'query': engtitle,
            }
            tmdb_data = requests.get(TMDB_URL,tmdb_params)
            json_tmdb = tmdb_data.json()
            movie_tmdb = json_tmdb['results']
            return Response(movie_tmdb,status=200)
            # return Response((get_poster,movie_tmdb),status=200)
            # return Response(get_poster,status=200)
    elif request.method == 'GET':
        print(json.dumps(secret_key))
        print(naver_key, naver_pw)
        posters = Poster.objects.all()
        serializer = PosterSerializer(posters, many=True)
        return Response(serializer.data)