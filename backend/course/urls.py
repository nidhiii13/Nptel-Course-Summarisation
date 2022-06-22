from django.urls import path,include
from .views import add_course, get_transcripts,download_transcripts

urlpatterns = [
    path('addcourse',add_course),
    path('getTranscripts',get_transcripts),
    path('downloadTranscripts',download_transcripts),
]