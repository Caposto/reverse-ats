#Reverse ATS

The goal of this project is to practice web-scraping with Python through a project that aims to streamline the job application process. The inspiration for this project comes from the Applicant Tracking System (ATS), a type of software used by many companies to organize and filter out prospective job candidates. I use Selenium to scrape the descriptions from LinkedIn's Job Board and then plan on using NLP to identiy keywords.

I plane on packaging the code into a chrome extension. To implement the python web scraping and NLP code, I will make a Flask or Django API to connect to the Chrome Extension code. The chrome extension will allow users to automatically deconstruct and compare their resume to different jobs on LinkedIn without having to copy and paste the description somewhere else.

# Installation/Setup
```
git clone https://github.com/Caposto/reverse-ats.git
virtualenv venv (creates virtual environment called 'venv')
venv\Scripts\activate (Activates virtual environment in cmd)
pip install -r requirements.txt
```

Install Proper Chrome Driver from: [Here](https://chromedriver.chromium.org/downloads) and add to project directory

