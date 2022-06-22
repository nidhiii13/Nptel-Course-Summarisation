from django.db import models
from department.models import Department
# Create your models here.
class Course(models.Model):
    course_id = models.CharField(max_length=15,unique=True,primary_key=True,null=False)
    course_name = models.CharField(max_length=50)
    dept = models.ForeignKey(Department,on_delete=models.CASCADE)
    sme = models.CharField(max_length=30)
    institute = models.CharField(max_length=30)
    link = models.TextField(default=None)
    no_of_weeks = models.IntegerField(default=4)

    def __str__(self):
        return self.course_id