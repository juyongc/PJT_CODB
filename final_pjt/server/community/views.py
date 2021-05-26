from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework import status
from django.shortcuts import render, get_list_or_404, get_object_or_404
from .models import Review, Comment
from .serializers import ReviewListSerializer, ReviewSerializer, CommentSerializer


@api_view(['GET', 'POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def reviews(request):
    if request.method == 'GET':
        review_list = get_list_or_404(Review)
        serializer = ReviewListSerializer(review_list, many=True)
        return Response(serializer.data)
    else:
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE', 'PUT'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def review_detail(request, pk):
    review = get_object_or_404(Review, pk=pk)

    if request.method == 'GET':
        if request.user == review.user:
            review.isEqual = True
        else:
            review.isEqual = False
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    if not request.user.review_set.filter(pk=pk).exists():
        return Response({'detail': '권한이 없습니다.'}, status=status.HTTP_403_FORBIDDEN)

    elif request.method == 'PUT':
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)

    else: # DELETE
        review.delete()
        response = {'pk': pk}
        return Response(response, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def comments(request):
    comment_list = get_list_or_404(Comment)
    serializer = CommentSerializer(comment_list, many=True)
    return Response(serializer.data)


@api_view(['GET', 'DELETE'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def comment_detail(request, pk):
    comment = get_object_or_404(Comment, pk=pk)
    if request.method == 'GET':
        if request.user == comment.user:
            comment.isEqual = True
        else:
            comment.isEqual = False
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    if not request.user.comment_set.filter(pk=pk).exists():
        return Response({'detail': '권한이 없습니다.'}, status=status.HTTP_403_FORBIDDEN)

    else: # DELETE
        comment.delete()
        response = {'pk': pk}
        return Response(response, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def review_comments(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    if request.method == 'GET':
        comment_list = get_list_or_404(Comment.objects.order_by('-pk'), review=review)
        serializer = CommentSerializer(comment_list, many=True)
        return Response(serializer.data)
    else: # POST
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(review=review, user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
