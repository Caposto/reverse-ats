from turtle import title
import requests 
import json
from bs4 import BeautifulSoup

#6/26 Goal: Get Job Title from a job posting on LinkedIn
# hhttps://www.linkedin.com/jobs/view/3114502964/?alternateChannel=search&refId=zFDuw0gRwxQIow6TJ5rl%2Bw%3D%3D&trackingId=MQvaNALJ6NJH6kOv0d0FGw%3D%3D
# Adobe "2022 Digital Academy Intern - Software Engineer"

adobe_url = "https://www.linkedin.com/jobs/collections/recommended/?currentJobId=3109522306"
siemens_url = "https://www.linkedin.com/jobs/view/3162081945/?alternateChannel=search&refId=mSagxZuQsPK28ZP3PZeK2g%3D%3D&trackingId=tVom1NboIDpmHDHSJXmNdg%3D%3D"

# Create an object class for scraped data? toString, only need to pass in URL once, only need to use one SOUP object 

class Post:

    # Initialize the job URL and create the Soup object to pass to methods
    def __init__(self, job_url):
        self.req = requests.request("GET", job_url, timeout=1)

        # Create soup object if the status code went through, else Print Error
        if self.req.status_code == 200:
            self.soup = BeautifulSoup(self.req.text, 'lxml')
            print("Success!")
        else:
            print("Error with request: " + str(self.data.status_code))
    
    def getJobDescription(self):
        description_tag = self.soup.find('div', id_='job-details')
        print(description_tag)
        # py_json_obj = str(description_tags[1].text)
        # json_obj = json.load(py_json_obj)
        # description = json_obj["description"]
        # return str(description)

adobe_post = Post(siemens_url)
adobe_post.getJobDescription()

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

    print("Job Title: " + job_title)

# Scrape and return the Company hiring
# FIXME: Formatting for location is a bit off, it has a bunch of space before and after the word
def getCompany(job_url):
    data = requests.get(job_url)
    soup = BeautifulSoup(data.text, 'lxml')

    company_tag = soup.find('a', class_='topcard__org-name-link topcard__flavor--black-link')
    company_name = company_tag.text

    print("Company Name: " + company_name)

# Scrape and return the Location
# FIXME: Formatting for location is a bit off, it has a bunch of space before and after the word
def getLocation(job_url):
    data = requests.get(job_url)
    soup = BeautifulSoup(data.text, 'lxml')

    location_tag = soup.find('span', class_="topcard__flavor topcard__flavor--bullet")
    location = location_tag.text

    print("Location: " + location)
    

def copyDescription(job_url):
    words = getJobDescription(job_url).split(' ')
    with open("description.txt", "w") as f:
        for word in words:
            f.write(word + "\n")

# Run the following code to write job_description to a file
# def formatStringToMultipleLines():

# print(getJobDescription(adobe_url))

# Run this to update description.txt with the current request's data
# copyDescription(adobe_url)

# Write results to an html file to make it easier to read
#with open("data.html", "w", encoding="utf-8") as f:
#    f.write(data.text)