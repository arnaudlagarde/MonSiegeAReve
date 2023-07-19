from rest_framework import serializers
from .models import Movie, Session, SpecialSession, Reservation


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'


class SpecialSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialSession
        fields = '__all__'


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'
