from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

import time
import requests 
import json
from bs4 import BeautifulSoup
from Post import Post

# Test URLs
harris_url = "https://www.linkedin.com/jobs/view/3177003033/?alternateChannel=search&refId=NZT9zV8uEoIg8agLGIavuA%3D%3D&trackingId=l23qk%2BcE7A9qdnEcH6JbWw%3D%3D"

# options = Options()
# options.add_argument("start-maximized")
# options.add_experimental_option("detach", True)

# wd = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
# wd.get(harris_url)

# Scroll to bottom of page - hopefully this exposes all HTML
# wd.execute_script("window.scrollTo(0, document.body.scrollHeight);")

harris_job = Post(harris_url)
print(harris_job.get_job_description)
# print(harris_job.get_employer())





