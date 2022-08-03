import pytest
from sample_jobs import job_postings
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from Post import Job_Post

# FIXME: Add url and job_posting["COMPANY"] parameters for automated testing of all 10 jobs
# FIXME: Find way to speed up testing by generaing only one webdriver per test
#class Test_L3HARRIS:
@pytest.fixture()
def scraper():
    options = Options()
    options.add_argument("start-maximized")
    # options.add_argument("--headless")
    options.add_experimental_option("detach", True) # Prevent browser from closing immediately
    wd = webdriver.Chrome(options=options)
    url = job_postings["L3HARRIS"]['url']
    return Job_Post(url, wd)

def test_title(scraper):
    assert scraper.scrape_job_title() == job_postings["L3HARRIS"]['title']
    scraper.end_session()

def test_employer(scraper):
    assert scraper.scrape_employer() == job_postings["L3HARRIS"]['employer']
    scraper.end_session()

def test_details(scraper):
    details = scraper.scrape_info_list()
    assert details["Seniority level"] == job_postings["L3HARRIS"]["details"]["seniority"]
    assert details["Employment type"] == job_postings["L3HARRIS"]["details"]["employment"]
    assert details["Job function"] == job_postings["L3HARRIS"]["details"]["function"]
    assert details["Industries"] == job_postings["L3HARRIS"]["details"]["industry"]
    scraper.end_session()