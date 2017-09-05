from rest_framework import serializers
from projects.models import Borehole, Project, Instrument, DataPoint
from django.contrib.auth.models import User

class DataPointSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField()

    class Meta:
        model = DataPoint
        fields = ('id', 'project', 'data_type', 'date', 'number', 'field_tech', 'location', 'name')

class ProjectSerializer(serializers.ModelSerializer):
    datapoints = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    pm = serializers.ReadOnlyField(source='pm.username')

    class Meta:
        model = Project
        fields = ('id', 'name', 'pm', 'location', 'client', 'boreholes', 'instruments', 'datapoints')


class UserSerializer(serializers.ModelSerializer):
    projects = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'projects')
