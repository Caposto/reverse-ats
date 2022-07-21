import requests
from bs4 import BeautifulSoup
import json

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
        tag = self.soup.find(id="job-details")
        print(tag)


# Run the following code to write job_description to a file
# def formatStringToMultipleLines():

# print(getJobDescription(adobe_url))

# Run this to update description.txt with the current request's data
# copyDescription(adobe_url)

# Write results to an html file to make it easier to read
#with open("data.html", "w", encoding="utf-8") as f:
#    f.write(data.text)