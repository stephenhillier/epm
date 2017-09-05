from django.contrib.gis.db import models
from django.conf import settings


class Project(models.Model):
    '''
    Represents a project for a client. Parent model for all project related data/objects.
    '''
    pm = models.ForeignKey(settings.AUTH_USER_MODEL,
                           related_name='projects',
                           on_delete=models.CASCADE)
    number = models.CharField(max_length=50)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    client = models.CharField(max_length=50)

    def __str__(self):
        return self.number + ' - ' + self.name

class DataPoint(models.Model):
    '''
    Data or test location. Parent model for a variety of data types
    e.g. test hole data or piezometer data.

    Currently supports:
    -CPT
    -DCPT
    -Inclinometers
    -Settlement gauges
    -Piezometers
    -Test pits
    -Test holes
    -Sampling points (stockpile, crusher etc.)
    '''

    CPT = "CPT"
    DCPT = "DCPT"
    INCLINOMETER = "SI"
    SETTLEMENT_GAUGE = "SG"
    PIEZOMETER = "PZ"
    TEST_PIT = "TP"
    TEST_HOLE = "TH"
    SAMPLING_POINT = "SA"


    DATA_TYPE_CHOICES = (
        (CPT, "CPT"),
        (DCPT, "DCPT"),
        (INCLINOMETER, "Inclinometer"),
        (PIEZOMETER, "Piezometer"),
        (SETTLEMENT_GAUGE, "Settlement gauge"),
        (TEST_HOLE, "Test hole"),
        (TEST_PIT, "Test pit"),
        (SAMPLING_POINT, "Sampling point")
    )

    project = models.ForeignKey(Project, related_name='datapoints', on_delete=models.CASCADE)
    data_type = models.CharField(max_length=4, choices=DATA_TYPE_CHOICES)
    number = models.PositiveIntegerField()
    date = models.DateField()
    location = models.PointField(srid=4326)
    field_tech = models.CharField(max_length=50)

    @property
    def name(self):
        return self.data_type + str(self.date.year)[-2:] + '-' + str(self.number)

    def __str__(self):
        return self.data_type + str(self.date.year)[-2:] + '-' + str(self.number)


# These models have been replaced by DataPoint and will be deprecated:
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
