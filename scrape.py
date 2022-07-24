from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from Post import Post

# Test URLs
harris_url = "https://www.linkedin.com/jobs/view/3177003033/?alternateChannel=search&refId=NZT9zV8uEoIg8agLGIavuA%3D%3D&trackingId=l23qk%2BcE7A9qdnEcH6JbWw%3D%3D"
ey_url = "https://www.linkedin.com/jobs/view/3178858633/?alternateChannel=search&refId=HSrPEUNyGlfqaMRMwcELlw%3D%3D&trackingId=YmvlBHj9gQxpxxAQNm4AxQ%3D%3D"

# FIXME: How do I know if the session has gotten all of the information it needs?
# FIXME: What are some alternatives to manual time.sleep() times
harris_job = Post(harris_url)
print(harris_job)
# print(harris_job.get_job_description() + '\n')
# print(harris_job.get_job_title() + '\n')
# print(harris_job.get_employer() + '\n')
# harris_job.end_session()

ey_job = Post(ey_url)
# print(ey_job.get_job_description() + '\n')
# print(ey_job.get_job_title() + '\n')
# print(ey_job.get_employer() + '\n')
# ey_job.end_session()


