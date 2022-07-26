from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

# A class for wrapping Selenium web scraping functionality into simple methods
# Scrapes data from the LinkedIn Job Board
class Job_Post:

    # FIXME: Test against Global WebDriver
    def __init__(self, job_url) -> None:
        """Creates Chromedriver object and runs it on the given job URL"""
        try:
            options = Options()
            options.add_argument("start-maximized")
            options.add_experimental_option("detach", True) # Prevent browser from closing immediately
            wd = webdriver.Chrome(options=options)

            self.wd = wd
            self.job_url = job_url
            self.wd.get(self.job_url)
        # FIXME: Research if there are better ways/best practices for handling error and exceptions
        except Exception as e:
            return "Error creating the web driver " + e

    def __str__(self) -> str:
        info = self.scrape_info_list()
        return("POSITION: " + self.scrape_job_title() + "\n" +
               "EMPLOYER: " + self.scrape_employer() + "\n" +
               "DESCRIPTION: " + self.scrape_raw_description() + "\n" +
               "SENIORITY LEVEL: " + info['Seniority level'] + "\n" +
               "EMPLOYMENT TYPE: " + info['Employment type'] + "\n" +
               "JOB FUNCTION: " + info['Job function'] + "\n" +
               "INDUSTRIES: " + info['Industries'])
    
    # UTILITY METHODS

    def get_url(self) -> str:
        return self.job_url

    def end_session(self) -> None:
        self.wd.quit()

    def expose_description(self) -> None:
        """Helper function that uses Selenium to press button that reveals entire job description"""
        try: 
            more_button = self.wd.find_element(By.CLASS_NAME, "show-more-less-html__button")
            self.wd.execute_script("arguments[0].click();", more_button)
        except Exception as e:
            return "Error finding button: " + e

    # FIXME: Implement
    def write_to_file(self, filename, text):
        return
    
    # SCRAPING METHODS

    # FIXME: Implement
    def get_job_id(self):
        return 

    def scrape_raw_description(self) -> str:
        """Calls expose_desciption() to access the proper HTML elements and then returns all of the text contained within the job description"""
        # FIXME: Try & Except or "if tag:"
        try:
            self.expose_description()
            description_tag = self.wd.find_element(By.CLASS_NAME, "show-more-less-html__markup")
            return description_tag.text
        except Exception as e:
            return "Error scraping the job description: " + e

    def scrape_job_title(self) -> str:
        try:
            title_tag = self.wd.find_element(By.CLASS_NAME, "top-card-layout__title")
            return title_tag.text
        except Exception as e:
            return "Error scraping the job title: " + e

    def scrape_employer(self) -> str:
        try:
            employer_tag = self.wd.find_element(By.CLASS_NAME, "topcard__org-name-link")
            return employer_tag.text
        except Exception as e:
            return "Error scraping the employer: " + e

    def scrape_info_list(self) -> dict:
        """
        Scrapes additional details about the job description and retrns the information in a dictionary
        Seniority Level (Junior, Senior....)
        Employment Type (Full-Time, Part-Time, Internship....)
        Job Function (Department within company)
        Industry
        """
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