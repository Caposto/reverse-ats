from selenium import webdriver
import requests 
import json
from bs4 import BeautifulSoup
from Post import Post

# Test URLs
adobe_url = "https://www.linkedin.com/jobs/collections/recommended/?currentJobId=3109522306"
siemens_url = "https://www.linkedin.com/jobs/view/3162081945/?alternateChannel=search&refId=mSagxZuQsPK28ZP3PZeK2g%3D%3D&trackingId=tVom1NboIDpmHDHSJXmNdg%3D%3D"
harris_url = "https://www.linkedin.com/jobs/view/3177003033/?alternateChannel=search&refId=NZT9zV8uEoIg8agLGIavuA%3D%3D&trackingId=l23qk%2BcE7A9qdnEcH6JbWw%3D%3D"

# Setup Chrome Web Driver
CHROME_DRIVER_PATH = './chromedriver.exe'

wd = webdriver.Chrome(executable_path="./chromedriver.exe")
wd.get(harris_url)

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