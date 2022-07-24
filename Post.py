from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

import time

class Post:

    # Initalize post object by passing in URL and a global webdriver
    def __init__(self, job_url):
        # Create Webdriver
        options = Options()
        options.add_argument("start-maximized")
        options.add_experimental_option("detach", True)
        wd = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        self.wd = wd
        self.job_url = job_url
    
    def get_job_description(self):
        more_button = self.wd.find_element(By.CLASS_NAME, "show-more-less-html__button")
        self.wd.execute_script("arguments[0].click();", more_button)
        description_tag = self.wd.find_element(By.CLASS_NAME, "show-more-less-html__markup")
        return description_tag.text

    def get_job_title(self):
        title_tag = self.wd.find_element(By.CLASS_NAME, "top-card-layout__title font-sans text-lg papabear:text-xl font-bold leading-open text-color-text mb-0 topcard__title")
        return title_tag.text

    def get_employer(self):
        employer_tag = self.wd.find_element(By.CLASS_NAME, "topcard__org-name-link topcard__flavor--black-link")
        return employer_tag.text

    def write_to_file(self, filename, text):
        return

    def proccess_request(self):
        time.sleep(3)
        self.wd.quit()



# Function for writing job description to a text file
# Commas and other characters are filtered out & each character is written on its own line
# filename (string): name of destination text file
# text (string): description string (usually in the form of a webdriver WebElement.text)
def write_to_file(filename, text):
    new_text = text.replace(',', '').replace(':', '')
    words = new_text.split()
    with open(filename, 'w') as f:
        for word in words:
            f.write(word + '\n')