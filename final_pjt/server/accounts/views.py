from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, LikeSeriallizer
from .models import Like_movie

from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


@api_view(['POST'])
def signup(request):
    password = request.data.get('password')
    confirm = request.data.get('passwordConfirmation')

    if password != confirm:
        return Response({'error':'비밀번호가 일치하지 않습니다.'}, status=400)
    
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        user.set_password(request.data.get('password'))
        user.save()
        return Response(serializer.data, status=201)


@api_view(['POST', 'GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def add_movie(request):
    if request.method == 'POST':
        serializer = LikeSeriallizer(data=request.data)
        # print(request.data)
        if serializer.is_valid(raise_exception=True):
            if request.user.like_movie_set.filter(title=request.data['title']).exists():
                request.user.like_movie_set.filter(title=request.data['title']).delete()
                return Response(False,status=200)
            else:
                serializer.save(user=request.user)
                return Response(True, status=201)

    elif request.method == 'GET':
        serializer = LikeSeriallizer(request.user.like_movie_set, many=True)
        return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def check(request):
    if request.method == 'POST':
        serializer = LikeSeriallizer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            if request.user.like_movie_set.filter(title=request.data['title']).exists():
                return Response(True,status=200)
            else:
                return Response(False, status=201)
