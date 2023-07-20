from django.db import models
from django.contrib.auth.models import User


class Movie(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=5, decimal_places=2, default=12.50)
    image = models.ImageField(upload_to='movie_images/', blank=True, null=True)
    special = models.BooleanField(default=False)  # Add this field

    def __str__(self):
        return self.title


class Session(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    available_seats = models.PositiveIntegerField(default=100)

    def __str__(self):
        return f"{self.movie.title} - {self.date} {self.time}"


class SpecialSession(models.Model):
    movie = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    price = models.DecimalField(max_digits=5, decimal_places=2, default=20)

    def __str__(self):
        return f"{self.movie} - {self.date} {self.time}"


class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    seats = models.PositiveIntegerField(default=100)

    def __str__(self):
        return f"{self.user.username} - {self.session.movie.title} - {self.seats} seat(s)"
