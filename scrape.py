from turtle import title
import requests 
import json
from bs4 import BeautifulSoup

# lxml parsers
#$ pip install lxml

#HTML 5 web parser - the way browsers do it
#$ pip install html5lib

#6/26 Goal: Get Job Title from a job posting on LinkedIn
# hhttps://www.linkedin.com/jobs/view/3114502964/?alternateChannel=search&refId=zFDuw0gRwxQIow6TJ5rl%2Bw%3D%3D&trackingId=MQvaNALJ6NJH6kOv0d0FGw%3D%3D
# Adobe "2022 Digital Academy Intern - Software Engineer"

adobe_url = "https://www.linkedin.com/jobs/view/3114502964/?alternateChannel=search&refId=zFDuw0gRwxQIow6TJ5rl%2Bw%3D%3D&trackingId=MQvaNALJ6NJH6kOv0d0FGw%3D%3D"

# Create an object class for scraped data? toString, only need to pass in URL once, only need to use one SOUP object 


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

# Scrape and return the job title 
def getJobTitle(job_url):
    data = requests.get(job_url)
    soup = BeautifulSoup(data.text, 'lxml')

    # In this case there is only one tag with this class, but will it always be? What if LinkedIn changes its styling?
    title_tag = soup.find('h3', class_='sub-nav-cta__header')
    job_title = title_tag.text

    print(job_title)

# Scrape and return the Company hiring
def getCompany(job_url):
    data = requests.get(job_url)
    soup = BeautifulSoup(data.text, 'lxml')

    company_tag = soup.find('a', class_='topcard__org-name-link topcard__flavor--black-link')
    company_name = company_tag.text

    print(company_name)

# FIXME: Implement this function
def getDate(job_url):
    data = requests.get(job_url)
    soup = BeautifulSoup(data.text, 'lxml')

# FIXME: Implement this function
def getLocation(job_url):
    data = requests.get(job_url)
    soup = BeautifulSoup(data.text, 'lxml')

def copyDescription(job_url):
    words = getJobDescription(job_url).split(' ')
    with open("description.txt", "w") as f:
        for word in words:
            f.write(word + "\n")

getCompany(adobe_url)

# Run the following code to write job_description to a file
# def formatStringToMultipleLines():

# print(getJobDescription(adobe_url))

# Run this to update description.txt with the current request's data
# copyDescription(adobe_url)

# Write results to an html file to make it easier to read
#with open("data.html", "w", encoding="utf-8") as f:
#    f.write(data.text)