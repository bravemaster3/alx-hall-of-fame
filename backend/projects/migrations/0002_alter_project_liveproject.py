# Generated by Django 5.0.4 on 2024-07-14 06:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='liveProject',
            field=models.URLField(blank=True),
        ),
    ]