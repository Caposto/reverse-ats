import unittest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from Post import Job_Post
from test_jobs import job_postings

options = Options()
options.add_argument("start-maximized")
options.add_experimental_option("detach", True) # Prevent browser from closing immediately
wd = webdriver.Chrome(options=options)

class TestScraper(unittest.TestCase):
    def testTitle(self):
        url = job_postings["EY"]["url"]
        job = Job_Post(url, wd)
        self.assertEqual(job.scrape_job_title(), job_postings["EY"]["title"])
        self.assertEqual(job.scrape_employer(), job_postings["EY"]["employer"])

        info = job.scrape_info_list()
        self.assertEqual(info["Seniority level"], job_postings["EY"]["details"]["seniority"])
        self.assertEqual(info["Employment type"], job_postings["EY"]["details"]["employment"])
        self.assertEqual(info["Job function"], job_postings["EY"]["details"]["function"])
        self.assertEqual(info["Industries"], job_postings["EY"]["details"]["industry"])

    #def testEmployer(self):
    #    url = job_postings["EY"]["url"]
    #    job = Job_Post(url, wd)
    #    self.assertEqual(job.scrape_employer(), job_postings["EY"]["employer"])

    #def testDetails(self):
    #    url = job_postings["EY"]["url"]
    #    job = Job_Post(url, wd)
    #    info = job.scrape_info_list()
    #    self.assertEqual(info["Seniority level"], job_postings["EY"]["details"]["seniority"])
    #    self.assertEqual(info["Employment type"], job_postings["EY"]["details"]["employment"])
    #    self.assertEqual(info["Job function"], job_postings["EY"]["details"]["function"])
    #    self.assertEqual(info["Industries"], job_postings["EY"]["details"]["industry"])

if __name__ == '__main__':
    unittest.main()