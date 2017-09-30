from django.conf.urls import url, include
from projects import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'projects/(?P<project>\d+)/data/(?P<datapoint>\d+)/soil_layers', views.APISoilLayerViewSet, base_name='soil_layer-api')
router.register(r'projects/(?P<project>\d+)/data', views.APIDataPointViewSet, base_name='datapoint-api')
router.register(r'projects', views.APIProjectViewSet, base_name='project-api')

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^', views.ProjectsHomeView.as_view(), name='project-home'),
]