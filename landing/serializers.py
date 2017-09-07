from rest_framework import serializers
from landing.models import Hello

class HelloSerializer(serializers.ModelSerializer):
    model = Hello
    fields = ['name', 'email', 'message']
