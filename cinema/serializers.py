from rest_framework import serializers
from django.contrib.auth.models import User
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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'is_staff']
        # To exclude the password field from API responses
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            # By default, the user is not an administrator
            is_staff=validated_data.get('is_staff', False)
        )
        return user
