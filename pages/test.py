import unittest
import page
from selenium import webdriver

# Page Object Design Pattern
# Page object represents an area where the test interacts within the web application UI
# Create an object for each part of the webpage

class LinkedInJobScrape(unittest.TestCase):
    """Testing Job Description Scraper with page objects"""

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("https://www.linkedin.com/jobs/view/3177003033/?alternateChannel=search&refId=NZT9zV8uEoIg8agLGIavuA%3D%3D&trackingId=l23qk%2BcE7A9qdnEcH6JbWw%3D%3D")