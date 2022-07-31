from Post import Job_Post
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from Post import Job_Post

options = Options()
options.add_argument("start-maximized")
options.add_experimental_option("detach", True) # Prevent browser from closing immediately
wd = webdriver.Chrome(options=options)

# Test URLs
harris_url = "https://www.linkedin.com/jobs/view/3177003033/?alternateChannel=search&refId=NZT9zV8uEoIg8agLGIavuA%3D%3D&trackingId=l23qk%2BcE7A9qdnEcH6JbWw%3D%3D"
ey_url = "https://www.linkedin.com/jobs/view/3148171398/?alternateChannel=search&refId=rL4qxZB4xgCbtk2ac4s8Hg%3D%3D&trackingId=p39dPQzT8UqeUBlTgFiTbQ%3D%3D"

# FIXME: How do I know if the session has gotten all of the information it needs?
harris_job = Job_Post(harris_url, wd)
print(harris_job.scrape_raw_description())
# print(harris_job.scrape_job_id())
# print(harris_job)
# harris_job.end_session()


# ey_job = Job_Post(ey_url)
# print(ey_job)
# ey_job.end_session()


