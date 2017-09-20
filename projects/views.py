from django.views.generic import TemplateView, DetailView, ListView, CreateView
from rest_framework import permissions, viewsets
from rest_framework.reverse import reverse
from projects.models import Project, DataPoint
from projects.serializers import ProjectSerializer, UserSerializer, DataPointSerializer
#from projects.permissions import IsOwnerOrReadOnly
# Create your views here.

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


class ProjectsMapView(ListView):
    template_name = "projects/datapoint_map.html"
    model = DataPoint

class ProjectCreateView(CreateView):
    model = Project
    fields = ['number', 'name', 'pm', 'location', 'client']

class ProjectsListView(ListView):
    model = Project

class ProjectDetailView(DetailView):
    model = Project
    pk_url_kwarg = 'project'

class ProjectHomeView(TemplateView):
    template_name = 'projects/start.html'

class DataPointDetailView(DetailView):
    model = DataPoint

    def get_queryset(self):
        return DataPoint.objects.filter(project_id=self.kwargs['project'])
    