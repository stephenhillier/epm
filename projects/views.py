from django.views.generic import TemplateView, DetailView, ListView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import permissions, viewsets
from rest_framework.reverse import reverse
from projects.models import Project, DataPoint
from projects.serializers import ProjectSerializer, UserSerializer, DataPointSerializer


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


class ProjectsMapView(LoginRequiredMixin, ListView):
    template_name = "projects/datapoint_map.html"
    model = DataPoint


class ProjectCreateView(LoginRequiredMixin, CreateView):
    model = Project
    fields = ['number', 'name', 'pm', 'location', 'client']


class ProjectsListView(LoginRequiredMixin, ListView):
    model = Project


class ProjectDetailView(LoginRequiredMixin, DetailView):
    model = Project
    pk_url_kwarg = 'project'


class ProjectHomeView(LoginRequiredMixin, TemplateView):
    template_name = 'projects/start.html'

class TestHoleList(LoginRequiredMixin, DetailView):
    template_name = 'projects/testhole_list.html'
    model = Project
    pk_url_kwarg = 'project'

class InstrumentList(LoginRequiredMixin, DetailView):
    template_name = 'projects/instrument_list.html'
    model = Project
    pk_url_kwarg = 'project'

class TestHoleDetailView(LoginRequiredMixin, DetailView):
    template_name = 'projects/testhole_detail.html'
    model = Project
    pk_url_kwarg = 'project'

    def get_context_data(self, **kwargs):
        context = super(TestHoleDetailView, self).get_context_data(**kwargs)
        testhole = DataPoint.objects.get(pk=self.kwargs['testhole'])
        context['testhole'] = testhole
        return context
        