from django.conf.urls import url, include
from projects import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'projects', views.APIProjectViewSet, base_name='project')
router.register(r'boreholes', views.APIBoreholeViewSet, base_name='borehole')
router.register(r'instruments', views.APIInstrumentViewSet, base_name='instrument')

urlpatterns = [
    url(r'^api/', include(router.urls)),
]