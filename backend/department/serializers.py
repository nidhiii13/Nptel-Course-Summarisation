from .models import Department
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.db.models import fields

class DeptSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'