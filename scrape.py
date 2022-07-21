from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

import time
import requests 
import json
from bs4 import BeautifulSoup
from Post import Post

# Test URLs
harris_url = "https://www.linkedin.com/jobs/view/3177003033/?alternateChannel=search&refId=NZT9zV8uEoIg8agLGIavuA%3D%3D&trackingId=l23qk%2BcE7A9qdnEcH6JbWw%3D%3D"

# Setup Chrome Web Driver
# CHROME_DRIVER_PATH = './chromedriver.exe'

options = Options()
options.add_argument("start-maximized")
options.add_experimental_option("detach", True)

wd = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
wd.get(harris_url)

# Scroll to bottom of page - hopefully this exposes all HTML
# wd.execute_script("window.scrollTo(0, document.body.scrollHeight);")

more_button = wd.find_element(By.CLASS_NAME, "show-more-less-html__button")
wd.execute_script("arguments[0].click();", more_button)

div = wd.find_element(By.CLASS_NAME, "show-more-less-html__markup")
print(div.text)
# button.location_once_scrolled_into_view
# wd.execute_script("arguments[0].scrollIntoView();", button)
# button.click()
# tag = wd.find_element(By.TAG_NAME, "h1")

time.sleep(100)
wd.quit()



