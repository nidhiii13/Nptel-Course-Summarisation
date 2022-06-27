import imp
import os
from django.http import HttpResponse
from django.shortcuts import render
import pandas as pd
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from department.models import Department
from course.models import Course
import wget
from tika import parser
from rest_framework.decorators import api_view
from .scrapy import scrape_link,get_lecture_transcripts
from .summarise import summarise_text
# Create your views here.

def add_course(request):
    data = pd.read_excel(io=r'C:\Users\nidhi\Nptel-Course-Summarisation\Final Course List (Jan - April 2022).xlsx', usecols=['Course Id','Discipline','Course Name','SME Name','Institute','NPTEL URL'], sheet_name=0)
    #print(data)
    courseId = pd.Series(data['Course Id']).to_list()
    courseName = pd.Series(data['Course Name']).to_list()
    Dept = pd.Series(data['Discipline']).to_list()
    smeName = pd.Series(data['SME Name']).to_list()
    Institute = pd.Series(data['Institute']).to_list()
    nptelURL = pd.Series(data['NPTEL URL']).to_list()
    for i in range(len(courseId)):
        course_id = courseId[i]
        course_name = courseName[i]
        dept = Dept[i]
        deptt = Department.objects.get(dept_name=dept)
        sme = smeName[i]
        institute = Institute[i]
        no_of_weeks = 8
        
        
        link = scrape_link(courseId[i])
        #print(link)
        Course.objects.create(course_id=course_id,course_name=course_name,dept=deptt,sme=sme,institute=institute,link=link,no_of_weeks=no_of_weeks)


       

    return HttpResponse({'msg':'success'})

@api_view(['POST'])
def get_transcripts(request):
    course = request.data.get('course')
    course_id = Course.objects.get(course_name=course)
    url = course_id.link
    #print(url)
    try:
        list = get_lecture_transcripts(url)
        return Response({'course':course,
        'transcripts':list},status=status.HTTP_200_OK)

    except:
        return Response({"msg":"fail"},status=status.HTTP_404_NOT_FOUND)



@api_view(['POST'])
def download_transcripts(request):
    url = "https://drive.google.com/uc?id="
    lec_no = request.data.get('lec_no')
    link = request.data.get('link')
    path = os.getcwd()
    path += "\\Downloads\\"+ lec_no + ".pdf"
    print(path)
    d_url = link.split('/')
    url += d_url[-2]
    response = wget.download(url, path)
    raw = parser.from_file(path)
    #print(raw['content'])
    os.remove(path)
    return Response({"transcript":raw['content']},status=status.HTTP_200_OK)


@api_view(['POST'])
def summariser(request):
    text = request.data.get('text')
    summ_text = summarise_text(text)
    return Response({'summ_text':summ_text},status=status.HTTP_200_OK)