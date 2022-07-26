from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

# FIXME: add methods for Seniority level, employment type, job function, and industries
class Post:
    # Create and assign Web Driver and run Selenium browser on the given URL
    def __init__(self, job_url) -> None:
        try:
            # Create Webdriver
            options = Options()
            options.add_argument("start-maximized")
            options.add_experimental_option("detach", True)
            wd = webdriver.Chrome(options=options)
            self.wd = wd
            self.job_url = job_url
            self.wd.get(self.job_url)
        except Exception as e:
            return "Error creating the web driver " + e

    def __str__(self) -> str:
        info = self.get_info_list()

        return("POSITION: " + self.get_job_title() + "\n" +
               "EMPLOYER: " + self.get_employer() + "\n" +
               "DESCRIPTION: " + self.get_job_description() + "\n" +
               "SENIORITY LEVEL: " + info['Seniority level'] + "\n" +
               "EMPLOYMENT TYPE: " + info['Employment type'] + "\n" +
               "JOB FUNCTION: " + info['Job function'] + "\n" +
               "INDUSTRIES: " + info['Industries']) 
    
    def get_job_description(self) -> str:
        try:
            self.expose_description()
            description_tag = self.wd.find_element(By.CLASS_NAME, "show-more-less-html__markup")
            return description_tag.text
        except Exception as e:
            return "Error scraping the job description: " + e

    def get_job_title(self) -> str:
        try:
            title_tag = self.wd.find_element(By.CLASS_NAME, "top-card-layout__title")
            return title_tag.text
        except Exception as e:
            return "Error scraping the job title: " + e

    def get_employer(self) -> str:
        try:
            employer_tag = self.wd.find_element(By.CLASS_NAME, "topcard__org-name-link")
            return employer_tag.text
        except Exception as e:
            return "Error scraping the employer: " + e
    
    # Helper function that automates browser to expand the section of the web page that contains the job description
    def expose_description(self) -> None:
        try: 
            more_button = self.wd.find_element(By.CLASS_NAME, "show-more-less-html__button")
            self.wd.execute_script("arguments[0].click();", more_button)
        except Exception as e:
            return "Error finding button: " + e

    def end_session(self) -> None:
        self.wd.quit()

    def get_info_list(self) -> str:
        job_info_list = self.wd.find_element(By.CLASS_NAME, "description__job-criteria-list")
        info = {}
        
        if job_info_list:
            categories = job_info_list.find_elements(By.TAG_NAME, "h3")
            types = job_info_list.find_elements(By.TAG_NAME, "span")

            for i in range(len(categories)):
                c = categories[i].text
                t = types[i].text
                info[c] = t

        return info

    def write_to_file(self, filename, text):
        return


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