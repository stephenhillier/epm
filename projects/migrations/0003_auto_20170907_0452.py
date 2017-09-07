# Generated by Django 2.0.dev20170824180835 on 2017-09-07 04:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_datapoint'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datapoint',
            name='data_type',
            field=models.CharField(choices=[('CPT', 'CPT'), ('DCPT', 'DCPT'), ('SI', 'Inclinometer'), ('PZ', 'Piezometer'), ('SG', 'Settlement gauge'), ('TH', 'Test hole'), ('TP', 'Test pit'), ('SA', 'Sampling point')], max_length=4),
        ),
    ]
