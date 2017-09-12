from django.conf.urls import url, include
from projects import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'projects/(?P<project>\d+)/data', views.APIDataPointViewSet, base_name='datapoint')
router.register(r'projects', views.APIProjectViewSet, base_name='project')


urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^my/', views.ProjectsMapView.as_view(), name='project-map'),
    #url(r'^', views.ProjectsAppView.as_view(), name='project-app'),
]