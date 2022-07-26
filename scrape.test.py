import unittest
from Post import Job_Post
from test_jobs import job_postings

class TestScraper(unittest.TestCase):
    def testJobTitle(self):
        l3harris_job = Job_Post(job_postings["L3HARRIS"])
        self.assertEqual(l3harris_job.scrape_job_title(), "Software Engineering Intern (Camden, NJ)")

if __name__ == '__main__':
    unittest.main()