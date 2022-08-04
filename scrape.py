from tests.sample_jobs import job_postings
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from Post import Job_Post

options = Options()
# FIXME: How do I run the webdriver without having a separate window pop up?
# options.add_argument('headless')
options.add_argument("start-maximized")
options.add_experimental_option("detach", True) # Prevent browser from closing immediately
wd = webdriver.Chrome(options=options)

# Test URLs
harris_url = "https://www.linkedin.com/jobs/view/3177003033/?alternateChannel=search&refId=NZT9zV8uEoIg8agLGIavuA%3D%3D&trackingId=l23qk%2BcE7A9qdnEcH6JbWw%3D%3D"
ey_url = "https://www.linkedin.com/jobs/view/3148171398/?alternateChannel=search&refId=rL4qxZB4xgCbtk2ac4s8Hg%3D%3D&trackingId=p39dPQzT8UqeUBlTgFiTbQ%3D%3D"


if __name__ == "__main__":
    # FIXME: How do I know if the session has gotten all of the information it needs?
    job = Job_Post(job_postings["MLB"]["url"], wd)
    # title = job.scrape_job_title()
    details = job.scrape_info_list()
    print(details)
    job.end_session()


