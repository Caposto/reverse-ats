import pytest
from sample_jobs import job_postings
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from Post import Job_Post


@pytest.fixture()
def scraper():
    options = Options()
    options.add_argument("start-maximized")
    options.add_argument("--headless")
    options.add_experimental_option("detach", True) # Prevent browser from closing immediately
    wd = webdriver.Chrome(options=options)
    url = job_postings["L3HARRIS"]['url']
    return Job_Post(url, wd)

@pytest.fixture()
def job_tag():
    return job_postings["L3HARRIS"]

def test_title(scraper, job_tag):
    assert scraper.scrape_job_title() == job_tag['title']
    scraper.end_session()

def test_employer(scraper, job_tag):
    assert scraper.scrape_employer() == job_tag['employer']
    scraper.end_session()

def test_details(scraper, job_tag):
    details = scraper.scrape_info_list()
    assert details["Seniority level"] == job_tag["details"]["seniority"]
    assert details["Employment type"] == job_tag["details"]["employment"]
    assert details["Job function"] == job_tag["details"]["function"]
    assert details["Industries"] == job_tag["details"]["industry"]
    scraper.end_session()

def test_id(scraper, job_tag):
    assert scraper.scrape_job_id() == job_tag['id']
    scraper.end_session()