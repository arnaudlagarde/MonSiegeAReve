# Generated by Django 4.2.3 on 2023-07-19 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cinema", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="movie",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="movie_images/"),
        ),
    ]