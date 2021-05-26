from django.urls import path
from . import views

app_name = 'movies'

urlpatterns = [
    path('poster/', views.poster, name='poster'),
]
