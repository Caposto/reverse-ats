from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

import requests 
import json
from bs4 import BeautifulSoup
from Post import Post

# Test URLs
adobe_url = "https://www.linkedin.com/jobs/collections/recommended/?currentJobId=3109522306"
siemens_url = "https://www.linkedin.com/jobs/view/3162081945/?alternateChannel=search&refId=mSagxZuQsPK28ZP3PZeK2g%3D%3D&trackingId=tVom1NboIDpmHDHSJXmNdg%3D%3D"
harris_url = "https://www.linkedin.com/jobs/view/3177003033/?alternateChannel=search&refId=NZT9zV8uEoIg8agLGIavuA%3D%3D&trackingId=l23qk%2BcE7A9qdnEcH6JbWw%3D%3D"

# Setup Chrome Web Driver
# CHROME_DRIVER_PATH = './chromedriver.exe'

options = Options()
options.add_argument("start-maximized")

wd = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
wd.get(harris_url)

tag = wd.find_element(By.TAG_NAME, "h1")
print(tag.text)

wd.quit()



