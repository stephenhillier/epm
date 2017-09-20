from django.contrib.gis.db import models
from django.conf import settings
from django.core.urlresolvers import reverse


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

    # combines project number and name e.g. "2017-001 - Highway 1 Upgrades, Victoria, BC"
    def __str__(self):
        return self.number + ' - ' + self.name

    def get_absolute_url(self):
        return reverse('project-detail', kwargs={'project': self.id})

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

    # DataPoint instances must be one of the following types.
    # Related data will depend on the type of DataPoint
    # e.g. TH/"Test hole" will have related fields "SoilLayer" and "Sample" containing field data
    
    CPT = "CPT"                 # Cone Penetration Test
    DCPT = "DCPT"               # Dynamic Cone
    INCLINOMETER = "SI"         # Inclinometer/Slope Indicator
    SETTLEMENT_GAUGE = "SG"     # Settlement hub (a fixed survey target to measure settlement over time)
    PIEZOMETER = "PZ"           # water level piezo/standpipe
    TEST_PIT = "TP"             # Test pit excavation
    TEST_HOLE = "TH"            # Drilled test hole
    SAMPLING_POINT = "SA"       # General sampling point e.g. stockpile grab sample


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

    # standard name format with instrument/hole type, year, and number e.g. TH17-3
    @property
    def name(self):
        return self.data_type + str(self.date.year)[-2:] + '-' + str(self.number)

    def __str__(self):
        return self.name


class SoilLayer(models.Model):
    '''
    Soil layers with visual descriptions and USCS classifications.

    - Each SoilLayer instance attaches to a "testhole" type DataPoint instance
    - Subsequent layers should be continuous (however, this is not enforced).
    - This model doesn't directly include lab tests, although test results may determine
    the USCS classification for layers. Lab tests are associated with samples.

    '''
 
    # abbreviations from Unified Soil Classification System:
    USCS_CHOICES = (
        ('CL', 'CL'),         # Clay, low plasticity
        ('ML', 'ML'),         # Silt, low plasticity
        ('OL', 'OL'),         # Organic silt
        ('PT', 'PT'),         # Peat
        ('SP', 'SP'),         # Sand, poorly graded, clean (less than 5% fines)
        ('SW', 'SW'),         # Sand, well graded, clean
        ('SM', 'SM'),         # Sand, > 12% fines (some silt to silty)
        ('SC', 'SC'),         # Sand, clayey
        ('GP', 'GP'),         # Gravel, poorly graded, clean
        ('GW', 'GW'),         # Gravel, well graded, clean
        ('GM', 'GM'),         # Gravel > 12% fines
        ('GC', 'GC'),         # Gravel, clayey
        ('SPSM', 'SP-SM'),    # Sand, poorly graded, 5-12% fines
        ('GPGM', 'GP-GM'),    # Gravel, poorly graded, 5-12% fines
        ('CLML', 'CL-ML'),    # Clay/silt (borderline Atterberg plot)
        ('ROCK', 'ROCK'),     # Bedrock
    )

    borehole = models.ForeignKey(DataPoint, related_name='soil_layers', on_delete=models.CASCADE)
    depth_from = models.DecimalField(max_digits=5, decimal_places=2)
    depth_to = models.DecimalField(max_digits=5, decimal_places=2)
    uscs = models.CharField(max_length=4, choices=USCS_CHOICES)
    description = models.TextField(blank=True, null=True)


# These models have been replaced by DataPoint:
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
