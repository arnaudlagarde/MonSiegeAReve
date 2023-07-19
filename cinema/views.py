from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Movie, Session, SpecialSession, Reservation
from .serializers import MovieSerializer, SessionSerializer, SpecialSessionSerializer, ReservationSerializer


class MovieAPIView(APIView):
    def get(self, request):
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)


class SessionAPIView(APIView):
    def get(self, request):
        sessions = Session.objects.all()
        serializer = SessionSerializer(sessions, many=True)
        return Response(serializer.data)


class SpecialSessionAPIView(APIView):
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
        reservation = Reservation(user=request.user, session=session, seats=seats_requested)
        reservation.save()
        session.available_seats -= seats_requested
        session.save()
        return Response({'message': 'Reservation successful'})
    else:
        return Response({'message': 'Not enough available seats'}, status=400)
