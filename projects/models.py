from django.contrib.gis.db import models
from django.conf import settings


class Project(models.Model):

    pm = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='projects', on_delete=models.CASCADE)
    number = models.CharField(max_length=50)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    client = models.CharField(max_length=50)

    def __str__(self):
        return self.number + ' - ' + self.name


class Borehole(models.Model):
    name = models.CharField(max_length=50)
    project = models.ForeignKey(Project, related_name='boreholes', on_delete=models.CASCADE)
    location = models.PointField(srid=4326)
    date_drilled = models.DateField()
    logged_by = models.CharField(max_length=50)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

class Instrument(models.Model):
    SETTLEMENT_GAUGE = "SG"
    PIEZOMETER = "PZ"
    INSTRUMENT_TYPE_CHOICES = (
        (SETTLEMENT_GAUGE, "Settlement gauge"),
        (PIEZOMETER, "Piezometer"),
    )
    name = models.CharField(max_length=50)
    project = models.ForeignKey(Project, related_name='instruments', on_delete=models.CASCADE)
    instrument_type = models.CharField(max_length=2, choices=INSTRUMENT_TYPE_CHOICES)
    location = models.PointField(srid=4326)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
