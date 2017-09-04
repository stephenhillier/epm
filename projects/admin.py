from django.contrib import admin
from .models import Project, Borehole, Instrument

# Register your models here.
admin.site.register(Project)
admin.site.register(Borehole)
admin.site.register(Instrument)