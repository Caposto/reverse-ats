from Post import Job_Post

# Test URLs
harris_url = "https://www.linkedin.com/jobs/view/3177003033/?alternateChannel=search&refId=NZT9zV8uEoIg8agLGIavuA%3D%3D&trackingId=l23qk%2BcE7A9qdnEcH6JbWw%3D%3D"
ey_url = "https://www.linkedin.com/jobs/view/3178858633/?alternateChannel=search&refId=HSrPEUNyGlfqaMRMwcELlw%3D%3D&trackingId=YmvlBHj9gQxpxxAQNm4AxQ%3D%3D"

# FIXME: How do I know if the session has gotten all of the information it needs?
# FIXME: What are some alternatives to manual time.sleep() times
harris_job = Job_Post(harris_url)
print(harris_job)
# harris_job.end_session()

# ey_job = Job_Post(ey_url)
# print(ey_job)
# ey_job.end_session()


