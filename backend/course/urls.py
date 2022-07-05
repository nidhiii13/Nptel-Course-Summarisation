from django.urls import path,include
from .views import add_course, get_transcripts,download_transcripts, summariser,ques_gen,get_yt

urlpatterns = [
    path('addcourse',add_course),
    path('getTranscripts',get_transcripts),
    path('downloadTranscripts',download_transcripts),
    path('summariseText',summariser),
    path('quesGen',ques_gen),
    path('getYT',get_yt)
]