# Generated by Django 3.1.13 on 2021-11-11 22:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tutors', '0003_auto_20211111_1428'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tutor',
            name='first_name',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='tutor',
            name='last_name',
            field=models.CharField(max_length=20),
        ),
    ]
