from rest_framework import serializers
from projects.models import Project, DataPoint, SoilLayer, SoilSample
from django.contrib.auth.models import User
from drf_extra_fields.geo_fields import PointField


class SoilSampleSerializer(serializers.ModelSerializer):
    datapoint_id = serializers.ReadOnlyField()
    sample_name = serializers.ReadOnlyField()

    class Meta:
        model = SoilSample
        fields = ('id', 'datapoint_id', 'number', 'sample_name', 'date', 'field_tech', 'depth_from', 'depth_to')
        

class SoilLayerSerializer(serializers.ModelSerializer):
    datapoint_id = serializers.ReadOnlyField()    

    class Meta:
        model = SoilLayer

        fields = ('id', 'datapoint_id', 'depth_from', 'depth_to', 'uscs', 'get_uscs_display', 'description')


class DataPointSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField()
    project_id = serializers.ReadOnlyField()
    soil_layers = SoilLayerSerializer(many=True, read_only=True)
    soil_samples = SoilSampleSerializer(many=True, read_only=True)
    latlng = serializers.ReadOnlyField()
    location = PointField()

    class Meta:
        model = DataPoint
        fields = ('id', 'project_id', 'data_type', 'date', 'number', 'field_tech', 'location', 'latlng', 'name', 'soil_layers', 'soil_samples', 'get_data_type_display')


class ProjectSerializer(serializers.ModelSerializer):
    datapoints = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    pm = serializers.ReadOnlyField(source='pm.username')
    latlng = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = ('id', 'number', 'name', 'pm', 'location', 'client', 'datapoints', 'latlng')


class UserSerializer(serializers.ModelSerializer):
    projects = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'projects')
