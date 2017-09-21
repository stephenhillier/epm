from django.contrib import admin
from .models import Project, DataPoint, SoilLayer

# Register your models here.
admin.site.register(Project)
admin.site.register(DataPoint)
admin.site.register(SoilLayer)