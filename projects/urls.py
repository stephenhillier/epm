from django.conf.urls import url, include
from projects import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'projects/(?P<project>\d+)/data', views.APIDataPointViewSet, base_name='datapoint-api')
router.register(r'projects', views.APIProjectViewSet, base_name='project-api')


urlpatterns = [
    url(r'^(?P<project>\d+)$', views.ProjectDetailView.as_view(), name='project-detail'),
    url(r'^api/', include(router.urls)),
    url(r'^list/', views.ProjectsListView.as_view(), name='project-list'),
    url(r'^map/', views.ProjectsMapView.as_view(), name='project-map'),
    #url(r'^', views.ProjectsAppView.as_view(), name='project-app'),
]