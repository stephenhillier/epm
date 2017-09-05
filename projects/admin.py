from django.contrib import admin
from .models import Project, Borehole, Instrument, DataPoint

# Register your models here.
admin.site.register(Project)
admin.site.register(DataPoint)