# Generated by Django 4.2.3 on 2023-07-20 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cinema", "0003_movie_special"),
    ]

    operations = [
        migrations.AlterField(
            model_name="session",
            name="available_seats",
            field=models.PositiveIntegerField(default=100),
        ),
    ]
