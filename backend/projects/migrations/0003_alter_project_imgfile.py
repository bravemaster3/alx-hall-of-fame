# Generated by Django 5.0.4 on 2024-07-21 20:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_alter_project_imgfile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='imgFile',
            field=models.ImageField(upload_to='media/'),
        ),
    ]
