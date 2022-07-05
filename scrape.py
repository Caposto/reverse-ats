import requests 
import pandas as pd
from bs4 import BeautifulSoup

# lxml parsers
#$ pip install lxml

#HTML 5 web parser - the way browsers do it
#$ pip install html5lib

#6/26 Goal: Get Job Title from a job posting on LinkedIn
# hhttps://www.linkedin.com/jobs/view/3114502964/?alternateChannel=search&refId=zFDuw0gRwxQIow6TJ5rl%2Bw%3D%3D&trackingId=MQvaNALJ6NJH6kOv0d0FGw%3D%3D
# Adobe "2022 Digital Academy Intern - Software Engineer"

adobe_url = "https://www.linkedin.com/jobs/view/3114502964/?alternateChannel=search&refId=zFDuw0gRwxQIow6TJ5rl%2Bw%3D%3D&trackingId=MQvaNALJ6NJH6kOv0d0FGw%3D%3D"

# Write results to an html file to make it easier to read
#with open("data.html", "w", encoding="utf-8") as f:
#    f.write(data.text)

def getJobDescription(post_url):
    # Request the html
    data = requests.get(post_url)

    # Create beautiful soup object
    soup = BeautifulSoup(data.text, 'lxml')
    tags = soup.find_all("script")
    # print("Job Title: " + soup.title.string)

    return tags[1].text

with open("description.txt", "w") as f:
    f.write(getJobDescription(adobe_url))

print(getJobDescription(adobe_url))