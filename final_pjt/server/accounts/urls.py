from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from . import views

app_name = 'accounts'

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('api-token-auth/', obtain_jwt_token),
    path('', views.add_movie, name='add_movie'),
    path('check/', views.check, name='check'),
]
