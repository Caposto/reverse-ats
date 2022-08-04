import pytest
from sample_jobs import job_postings
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from Post import Job_Post

# Pass into job_tag fixture
ENTRIES = [job_post for job_post in job_postings]

# @pytest.mark.parametrize('job_post', job_postings)
class TestScraper:
    @pytest.fixture(params=ENTRIES)
    def scraper(self, request):
        options = Options()
        options.add_argument("start-maximized")
        options.add_argument("--headless")
        options.add_experimental_option("detach", True) # Prevent browser from closing immediately
        wd = webdriver.Chrome(options=options)
        url = job_postings[request.param]["url"]
        return [Job_Post(url, wd), job_postings[request.param]] # Return pair: [Web Scraping Class, Correct Job Details]

    def test_title(self, scraper):
        assert scraper[0].scrape_job_title() == scraper[1]['title']
        scraper[0].end_session()

    def test_employer(self, scraper):
        assert scraper[0].scrape_employer() == scraper[1]['employer']
        scraper[0].end_session()

    def test_details(self, scraper):
        details = scraper[0].scrape_info_list()
        assert details["Seniority level"] == scraper[1]["details"]["seniority"]
        assert details["Employment type"] == scraper[1]["details"]["employment"]
        assert details["Job function"] == scraper[1]["details"]["function"]
        assert details["Industries"] == scraper[1]["details"]["industry"]
        scraper[0].end_session()

    def test_id(self, scraper):
        assert scraper[0].scrape_job_id() == scraper[1]['id']
        scraper[0].end_session()


    