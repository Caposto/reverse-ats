import pytest
from sample_jobs import job_postings
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from Post import Job_Post

@pytest.fixture
def scraper():
    options = Options()
    options.add_argument("start-maximized")
    options.add_experimental_option("detach", True) # Prevent browser from closing immediately
    wd = webdriver.Chrome(options=options)
    url = job_postings["L3HARRIS"]['url']
    return Job_Post(url, wd)

def test_title(scraper):
    assert scraper.scrape_job_title() == job_postings["L3HARRIS"]['title']
    scraper.end_session()

def test_employer(scraper):
    assert scraper.scrape_employer() != "Amazon"
    scraper.end_session()