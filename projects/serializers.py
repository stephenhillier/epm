from rest_framework import serializers
from projects.models import Borehole, Project, Instrument
from django.contrib.auth.models import User

class BoreholeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Borehole
        fields = ('id', 'project', 'name', 'date_drilled', 'logged_by', 'location')


class InstrumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Instrument
        fields = ('id', 'project', 'name', 'instrument_type', 'location')


class ProjectSerializer(serializers.ModelSerializer):
    boreholes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    instruments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    pm = serializers.ReadOnlyField(source='pm.username')

    class Meta:
        model = Project
        fields = ('id', 'name', 'pm', 'location', 'client', 'boreholes', 'instruments')


class UserSerializer(serializers.ModelSerializer):
    projects = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'projects')
