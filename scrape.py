import requests 
import pandas as pd
from bs4 import BeautifulSoup

# lxml parsers
#$ apt-get install python-lxml
#$ easy_install lxml
#$ pip install lxml

#HTML 5 web parser - the way browsers do it
#$ apt-get install python-html5lib
#$ easy_install html5lib
#$ pip install html5lib

# Create a BeautifulSoup object
soup = BeautifulSoup('<b class="boldest">Extremely bold</b>', 'lxml')
tag = soup.b
print(type(tag))