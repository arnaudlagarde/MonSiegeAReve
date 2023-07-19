from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('reserve/<int:session_id>/', views.reserve_seat, name='reserve'),
    path('history/', views.user_history, name='history'),
]
