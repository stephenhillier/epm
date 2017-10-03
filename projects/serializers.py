from rest_framework import serializers
from projects.models import Project, DataPoint, SoilLayer
from django.contrib.auth.models import User


class SoilLayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoilLayer
        datapoint = serializers.ReadOnlyField()
        fields = ('id', 'datapoint', 'depth_from', 'depth_to', 'get_uscs_display',)


class DataPointSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField()
    project_id = serializers.ReadOnlyField()
    soil_layers = SoilLayerSerializer(many=True, read_only=True)

    class Meta:
        model = DataPoint
        fields = ('id', 'project_id', 'data_type', 'date', 'number', 'field_tech', 'location', 'name', 'soil_layers')


class ProjectSerializer(serializers.ModelSerializer):
    datapoints = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    pm = serializers.ReadOnlyField(source='pm.username')
    xpoint = serializers.ReadOnlyField()
    ypoint = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = ('id', 'number', 'name', 'pm', 'location', 'client', 'datapoints', 'xpoint', 'ypoint')


class UserSerializer(serializers.ModelSerializer):
    projects = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'projects')
