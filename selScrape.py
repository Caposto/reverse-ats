import requests
from selenium import webdriver
import time

adobe_url = "https://www.linkedin.com/jobs/view/3114502964/?alternateChannel=search&refId=zFDuw0gRwxQIow6TJ5rl%2Bw%3D%3D&trackingId=MQvaNALJ6NJH6kOv0d0FGw%3D%3D"

# Setup chrome driver - drivers interface with the specified browser
wd = webdriver.Chrome('./chromedriver.exe')
wd.get(adobe_url)