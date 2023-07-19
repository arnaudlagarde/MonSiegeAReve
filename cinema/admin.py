from django.contrib import admin
from .models import Movie, Session, SpecialSession, Reservation

admin.site.register(Movie)
admin.site.register(Session)
admin.site.register(SpecialSession)
admin.site.register(Reservation)
