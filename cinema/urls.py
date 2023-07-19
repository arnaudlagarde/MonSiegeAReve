from django.urls import path
from .views import MovieAPIView, SessionAPIView, SpecialSessionAPIView, user_create, reserve_seat
from rest_framework.authtoken.views import obtain_auth_token  # Import token view

urlpatterns = [
    path('api/movies/', MovieAPIView.as_view(), name='movies-list'),
    path('api/sessions/', SessionAPIView.as_view(), name='sessions-list'),
    path('api/special_sessions/', SpecialSessionAPIView.as_view(),
         name='special-sessions-list'),
    path('api/reserve/', reserve_seat, name='reserve-seat'),
    # Use the user_create function
    path('api/signup/', user_create, name='user-create'),
    # Token authentication view
    path('api/token/', obtain_auth_token, name='api-token'),
]
