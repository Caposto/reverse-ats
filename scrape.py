import requests 
import json
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

def getJobDescription(job_url):
    # Request the html
    data = requests.get(job_url)

    # Create beautiful soup object
    soup = BeautifulSoup(data.text, 'lxml')
    tags = soup.find_all("script")

    py_json_obj = str(tags[1].text)
    json_obj = json.loads(py_json_obj)

    description = json_obj["description"]

    # print("Job Title: " + soup.title.string)
    return str(description)


def copyDescription(job_url):
    words = getJobDescription(job_url).split(' ')
    with open("description.txt", "w") as f:
        for word in words:
            f.write(word + "\n")

# def formatStringToMultipleLines():


# print(getJobDescription(adobe_url))

# Run this to update description.txt with the current request's data
# copyDescription(adobe_url)

# Write results to an html file to make it easier to read
#with open("data.html", "w", encoding="utf-8") as f:
#    f.write(data.text)