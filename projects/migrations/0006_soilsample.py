# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-21 21:07
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0005_auto_20170921_2022'),
    ]

    operations = [
        migrations.CreateModel(
            name='SoilSample',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.PositiveIntegerField()),
                ('date', models.DateField()),
                ('field_tech', models.CharField(max_length=50)),
                ('depth_from', models.DecimalField(decimal_places=2, max_digits=5)),
                ('depth_to', models.DecimalField(decimal_places=2, max_digits=5)),
                ('datapoint', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='soil_samples', to='projects.DataPoint')),
            ],
            options={
                'ordering': ['number'],
            },
        ),
    ]