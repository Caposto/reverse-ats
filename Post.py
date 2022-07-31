from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Exceptions
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException

# A class for wrapping Selenium web scraping functionality into simple methods
# Scrapes data from the LinkedIn Job Board
class Job_Post:

    def __init__(self, job_url, webdriver) -> None:
        """
        Initalize and retrieve Job Posting with Selenium ChromeDriver
        Params: job_url - url of job posting, webdriver - globally declared Chromedriver
        """
        self._wd = webdriver
        self.__job_url = job_url
        try:
            self._wd.get(self.__job_url)
        except Exception as e:
            print("Exception raised when launching browser: " + str(e))
            self._wd.close()

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
    def end_session(self):
        self._wd.close()

    def write_to_file(self, filename):
        """
        Function for writing job description to a text file
        Commas and other characters are filtered out & each character is written on its own line
        filename (string): name of destination .txt file
        """
        text = self.scrape_raw_description()
        new_text = text.replace(',', '').replace(':', '')
        words = new_text.split()
        with open(filename, 'w') as f:
            for word in words:
                f.write(word + '\n')
    
    # SCRAPING METHODS
    def scrape_job_id(self):
        """
        Returns the LinkedIn Job ID by Splitting the URL with '/' giving an array example:
        ['https:', '', 'www.linkedin.com', 'jobs', 'view', '3177003033', 
        '?alternateChannel=search&refId=NZT9zV8uEoIg8agLGIavuA%3D%3D&trackingId=l23qk%2BcE7A9qdnEcH6JbWw%3D%3D']
        The ID is the 6th element
        """
        url_array = self.__job_url.split("/")
        if url_array[2] == 'www.linkedin.com' and url_array:
            id = url_array[5]
            return id
        else: # incorrect URL format or different site entirely
            return "The given url is not compatible with the webscraper"

    def scrape_raw_description(self, time=5) -> str:
        """
        Searches for button that expands/exposes the full job description and presses if detected
        Params: time = seconds before wait ex
        Throws TimeoutException if the element is not found in the specified time
        """
        # FIXME: Implement explicit waits on other scraping methods as needed
        more_button = WebDriverWait(self._wd, time).until(EC.presence_of_element_located(
                                                      (By.CLASS_NAME, "show-more-less-html__button")))
        if (more_button):
            self._wd.execute_script("arguments[0].click();", more_button)
            try:
                description_tag = self._wd.find_element(By.CLASS_NAME, "show-more-less-html__markup") 
                return description_tag.text
            except NoSuchElementException as e:
                return "Job Description Not Found, NoSuchElementException raised: " + str(e)
        else:
            self._wd.close()
            return "Error Finding More Button"

    def scrape_job_title(self) -> str:
        try:
            title_tag = self._wd.find_element(By.CLASS_NAME, "top-card-layout__titles")
            return title_tag.text
        except NoSuchElementException as e:
            return "Job Title Not Found, NoSuchElementException raised: " + str(e)

    def scrape_employer(self) -> str:
        try:
            employer_tag = self._wd.find_element(By.CLASS_NAME, "topcard__org-name-link")
            return employer_tag.text
        except NoSuchElementException as e:
            return "Employer Not Found, NoSuchElementException raised: " + str(e)

    def scrape_info_list(self) -> dict:
        """
        Scrapes additional details about the job description and retrns the information in a dictionary
        Seniority Level (Junior, Senior....)
        Employment Type (Full-Time, Part-Time, Internship....)
        Job Function (Department within company)
        Industry
        """
        try:
            job_info_list = self._wd.find_element(By.CLASS_NAME, "description__job-criteria-list")
            info = {}
        
            if job_info_list:
                categories = job_info_list.find_elements(By.TAG_NAME, "h3")
                types = job_info_list.find_elements(By.TAG_NAME, "span")

                for i in range(len(categories)):
                    c = categories[i].text
                    t = types[i].text
                    info[c] = t

            return info

        except NoSuchElementException as e:
            return "Additional Job Details Not Found, NoSuchElementException raised: " + str(e)