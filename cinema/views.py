from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Movie, Session, SpecialSession, Reservation
from .serializers import MovieSerializer, SessionSerializer, SpecialSessionSerializer, ReservationSerializer, UserSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework.authentication import TokenAuthentication


def get_csrf_token(request):
    # Fetch the CSRF token using the get_token function
    csrf_token = get_token(request)
    # Return the CSRF token in a JSON response
    return JsonResponse({'csrfToken': csrf_token})


@api_view(['GET'])
def get_remaining_seats(request, session_id):
    try:
        session = Session.objects.get(pk=session_id)
        remaining_seats = session.available_seats
        return Response({'remainingSeats': remaining_seats})
    except Session.DoesNotExist:
        return Response({'error': 'Session not found'}, status=404)


class MovieAPIView(APIView):
    # temporaire pour les tests, besoin du token d'authentification autrement, à retirer après les tests
    permission_classes = [AllowAny]

    def get(self, request):
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SessionAPIView(APIView):
    # Allow any (unauthenticated) user to access the session list
    permission_classes = [AllowAny]

    def get(self, request):
        sessions = Session.objects.all()
        serializer = SessionSerializer(sessions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SessionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SpecialSessionAPIView(APIView):
    # Allow any (unauthenticated) user to access the session list
    permission_classes = [AllowAny]

    def get(self, request):
        special_sessions = SpecialSession.objects.all()
        serializer = SpecialSessionSerializer(special_sessions, many=True)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reserve_seat(request):
    session_id = request.data.get('session_id')
    seats_requested = int(request.data.get('seats', 1))

    session = get_object_or_404(Session, pk=session_id)
    if session.available_seats >= seats_requested:
        reservation = Reservation(
            user=request.user, session=session, seats=seats_requested)
        reservation.save()
        session.available_seats -= seats_requested
        session.save()
        return Response({'message': 'Reservation successful'})
    else:
        return Response({'message': 'Not enough available seats'}, status=400)


# The modified view for user creation
@api_view(['POST'])
@permission_classes([AllowAny])  # Allow anyone to sign up
def user_create(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def get_user(request):
    if request.user.is_authenticated:
        # Récupérer l'utilisateur actuellement connecté
        user = request.user
        # Serializer l'utilisateur pour renvoyer ses informations
        serializer = UserSerializer(user)
        return Response(serializer.data)
    else:
        return Response({'detail': 'User not authenticated.'}, status=401)
