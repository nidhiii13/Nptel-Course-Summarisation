import os
import requests
from bs4 import BeautifulSoup as bs
import re

def scrape_link(courseId):
    url = "https://archive.nptel.ac.in/noc/courses/noc22/SEM1/"+courseId
    print(url)
    response = requests.get(url)
    data = response.text
    soup = bs(data, 'lxml')
    #print(soup.prettify())

    for link in soup.find_all('a', 
                          attrs={'href': re.compile("^http://")}):
                          text= link.text.strip()
                          print(text)
                          if(text=="View Course"):
                              print(link.get('href'))  
                              return str(link.get('href'))

def get_lecture_transcripts(url):
    lec = {}
    response = requests.get(url)
    data = response.text
    soup = bs(data, 'lxml')

    tags = soup.find_all('a')
    print(tags)
    c = 1
    for t in tags:
        if(t.text=='Download Verified'):
            lid = "l"+str(c)
            lec[lid]=t['href']
            c = c+1
    print(lec)
    return (lec)