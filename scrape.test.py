import unittest
import page
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from Post import Job_Post
from test_jobs import job_postings

# FIXME: Introduce explicit waits that wait until webpage is tested before moving on to the next
class TestScraper(unittest.TestCase):
    def setUp(self):
        options = Options()
        options.add_argument("start-maximized")
        options.add_experimental_option("detach", True) # Prevent browser from closing immediately
        wd = webdriver.Chrome(options=options)
        self.wd = wd
        self.url = job_postings["EY"]["url"]
        self.job = Job_Post(self.url, self.wd)

    def testTitle(self):
        self.assertEqual(self.job.scrape_job_title(), job_postings["EY"]["title"])

    def testEmployer(self):
        self.assertEqual(self.job.scrape_employer(), job_postings["EY"]["employer"])

    def testDetails(self):
        info = self.job.scrape_info_list()
        self.assertEqual(info["Seniority level"], job_postings["EY"]["details"]["seniority"])
        self.assertEqual(info["Employment type"], job_postings["EY"]["details"]["employment"])
        self.assertEqual(info["Job function"], job_postings["EY"]["details"]["function"])
        self.assertEqual(info["Industries"], job_postings["EY"]["details"]["industry"])

    def close(self):
        self.wd.close()

if __name__ == '__main__':
    unittest.main()