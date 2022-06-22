from django.shortcuts import render
from rest_framework.response import Response
from department.serializers import DeptSerializer
from rest_framework.decorators import api_view
from department.models import Department
from .serializers import DeptSerializer
from rest_framework import viewsets
from course.models import Course
from course.serializers import CourseSerializer
# Create your views here.

class DeptViewset(viewsets.ModelViewSet):
    queryset = Department.objects.all().order_by('dept_name')
    serializer_class = DeptSerializer

@api_view(['GET'])
def get_course(request,pk):
    dept = Department.objects.get(dept_name=pk)
    courses = Course.objects.all().filter(dept=dept)
    serializer = CourseSerializer(courses,many=True)

    return Response(serializer.data)

