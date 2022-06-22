from distutils.file_util import move_file
from django.db import models

# Create your models here.
class Department(models.Model):
    dept_name = models.CharField(max_length=50,unique=True)

    def __str__(self):
        return str(self.dept_name)