from django.urls import path
from . import views

app_name = 'community'

urlpatterns = [
    path('reviews/', views.reviews),
    path('review/<int:pk>/', views.review_detail),
    path('comments/', views.comments),
    path('comments/<int:pk>/', views.comment_detail),
    path('review/<int:review_pk>/comments/', views.review_comments),
]
