from django.shortcuts import render
from rest_framework import generics, permissions, renderers, viewsets
from rest_framework.decorators import api_view, detail_route
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .models import Project, Borehole, Instrument
from projects.serializers import ProjectSerializer, BoreholeSerializer, UserSerializer, InstrumentSerializer
#from projects.permissions import IsOwnerOrReadOnly
# Create your views here.

class APIProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(pm=self.request.user)

class APIBoreholeViewSet(viewsets.ModelViewSet):
    serializer_class = BoreholeSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Borehole.objects.all()

    #def get_queryset(self):
    #   project = self.kwargs['pk']
    #   return Borehole.objects.filter(project=project)

class APIInstrumentViewSet(viewsets.ModelViewSet):
    serializer_class = InstrumentSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Instrument.objects.all()

    #def get_queryset(self):
    #    project = self.kwargs['pk']
    #    return Borehole.objects.filter(project=project)

