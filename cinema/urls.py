from django.urls import path
from .views import MovieAPIView, SessionAPIView, SpecialSessionAPIView, UserCreateAPIView, reserve_seat

urlpatterns = [
    path('api/movies/', MovieAPIView.as_view(), name='movies-list'),
    path('api/sessions/', SessionAPIView.as_view(), name='sessions-list'),
    path('api/special_sessions/', SpecialSessionAPIView.as_view(), name='special-sessions-list'),
    path('api/reserve/', reserve_seat, name='reserve-seat'),
    path('api/signup/', UserCreateAPIView.as_view(), name='user-create'),  # Nouvelle URL pour la création d'utilisateurs
]
