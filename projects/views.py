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


class ProjectHomeView(LoginRequiredMixin, TemplateView):
    template_name = 'projects/start.html'


class ProjectsListView(LoginRequiredMixin, ListView):
    model = Project


class ProjectDetailView(LoginRequiredMixin, DetailView):
    model = Project
    pk_url_kwarg = 'project'


class ProjectCreateView(LoginRequiredMixin, CreateView):
    model = Project
    fields = ['number', 'name', 'pm', 'location', 'client']


class InstrumentList(LoginRequiredMixin, DetailView):
    template_name = 'projects/instrument_list.html'
    model = Project
    pk_url_kwarg = 'project'


class TestHoleList(LoginRequiredMixin, DetailView):
    template_name = 'projects/testhole_list.html'
    model = Project
    pk_url_kwarg = 'project'


class TestHoleDetailView(LoginRequiredMixin, DetailView):
    template_name = 'projects/testhole_detail.html'
    model = Project
    pk_url_kwarg = 'project'

    # Add requested testhole to context:
    # Get DataPoint object with pk given by url kwarg 'testhole', add it to context
    def get_context_data(self, **kwargs):
        context = super(TestHoleDetailView, self).get_context_data(**kwargs)
        testhole = DataPoint.objects.get(pk=self.kwargs['testhole'])
        context['testhole'] = testhole
        return context

class InstrumentDetailView(LoginRequiredMixin, DetailView):
    template_name = 'projects/instrument_detail.html'
    model = Project
    pk_url_kwarg = 'project'

    # Add requested instrument to context:
    def get_context_data(self, **kwargs):
        context = super(InstrumentDetailView, self).get_context_data(**kwargs)
        instrument = DataPoint.objects.get(pk=self.kwargs['instrument'])
        context['instrument'] = instrument
        return context