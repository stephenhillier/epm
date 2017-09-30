from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import permissions, viewsets
from rest_framework.reverse import reverse
from projects.models import Project, DataPoint, SoilLayer, SoilSample
from projects.serializers import ProjectSerializer, UserSerializer, DataPointSerializer, SoilLayerSerializer

class APIProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(pm=self.request.user)


class APIDataPointViewSet(viewsets.ModelViewSet):
    serializer_class = DataPointSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return DataPoint.objects.filter(project_id=self.kwargs['project'])

    def perform_create(self, serializer):
        serializer.save(project_id=self.kwargs['project'])


class APISoilLayerViewSet(viewsets.ModelViewSet):
    serializer_class = SoilLayerSerializer

    def get_queryset(self):
        return SoilLayer.objects.filter(datapoint_id=self.kwargs['datapoint'])

    def perform_create(self, serializer):
        serializer.save(datapoint_id=self.kwargs['datapoint'])


class ProjectsHomeView(LoginRequiredMixin, TemplateView):
    template_name = "projects/home.html"
