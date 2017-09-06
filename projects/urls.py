from django.conf.urls import url, include
from projects import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'projects', views.APIProjectViewSet, base_name='project')
router.register(r'data', views.APIDataPointViewSet, base_name='datapoint')

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^projects/', views.ProjectsAppView.as_view(), name='project-app'),
    url(r'^', views.LandingView.as_view(), name='landing'),

]