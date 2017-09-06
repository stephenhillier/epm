from django.views.generic import TemplateView
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
    queryset = DataPoint.objects.all()
    serializer_class = DataPointSerializer
    permission_classes = (permissions.IsAuthenticated,)


class ProjectsAppView(TemplateView):
    template_name = "projects/index.html"