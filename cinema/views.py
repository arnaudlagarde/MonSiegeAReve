from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Movie, Session, SpecialSession, Reservation

def index(request):
    sessions = Session.objects.all()
    return render(request, 'cinema/index.html', {'sessions': sessions})

@login_required
def reserve_seat(request, session_id):
    session = Session.objects.get(pk=session_id)
    
    if request.method == 'POST':
        seats_requested = int(request.POST.get('seats', 1))
        
        if session.available_seats >= seats_requested:
            reservation = Reservation(user=request.user, session=session, seats=seats_requested)
            reservation.save()
            session.available_seats -= seats_requested
            session.save()
            return redirect('index')
        else:
            error_message = "Désolé, il n'y a pas assez de places disponibles."
            return render(request, 'cinema/reserve.html', {'session': session, 'error_message': error_message})
    
    return render(request, 'cinema/reserve.html', {'session': session})

@login_required
def user_history(request):
    reservations = Reservation.objects.filter(user=request.user)
    return render(request, 'cinema/history.html', {'reservations': reservations})
