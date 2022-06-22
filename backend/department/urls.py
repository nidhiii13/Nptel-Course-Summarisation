from rest_framework.routers import DefaultRouter
from .views import DeptViewset
from django.urls import path,include
from .views import get_course
router = DefaultRouter()
router.register('getDept',DeptViewset,basename='getDept')

urlpatterns = [
    path('',include(router.urls)),
    path('getcourse/<str:pk>',get_course),
]