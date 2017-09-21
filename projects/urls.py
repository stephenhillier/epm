from django.conf.urls import url, include
from projects import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'projects/(?P<project>\d+)/data', views.APIDataPointViewSet, base_name='datapoint-api')
router.register(r'projects', views.APIProjectViewSet, base_name='project-api')

urlpatterns = [
    url(r'^(?P<project>\d+)/data/testholes/(?P<testhole>\d+)/$', views.TestHoleDetailView.as_view(), name='testhole-detail'),
    url(r'^(?P<project>\d+)/data/testholes/$', views.TestHoleList.as_view(), name='testhole-list'),
    url(r'^(?P<project>\d+)/data/instruments/(?P<instrument>\d+)/', views.InstrumentDetailView.as_view(), name='instrument-detail'),
    url(r'^(?P<project>\d+)/data/instruments/$', views.InstrumentList.as_view(), name='instrument-list'),
    url(r'^(?P<project>\d+)/$', views.ProjectDetailView.as_view(), name='project-detail'),
    url(r'^list/', views.ProjectsListView.as_view(), name='project-list'),
    url(r'^new/', views.ProjectCreateView.as_view(), name='project-create'),
    url(r'^', views.ProjectHomeView.as_view(), name='project-home'),
    url(r'^api/', include(router.urls)),
]