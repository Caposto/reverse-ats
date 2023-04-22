import PyPDF2
import spacy
import re

#################################################SPACY##############################################################

# FIXME: What is the output? A string?
def extract_pdf_text(pdf: str):
    """Method that accepts a pdf file/path to pdf file as its argument
       and uses PyPDF2 to scrape and then return a dictionary of keywords"""
    pdf = open(pdf, 'rb')
    pdf_reader = PyPDF2.PdfFileReader(pdf)
    page = pdf_reader.getPage(0) # Should always be one page since only accepting 1 page resumes
    return page.extractText()

#FIXME: Look into: https://spacy.io/models to see if there are ways to optimize the loading process by disabling certain features

def extract_keywords_md(description: str) -> list[str]:
    """Accepts a string and uses spacy to return the keywords as a list of strings using en_core_web_md"""
    nlp = spacy.load("en_core_web_md")
    doc = nlp(description)
    keyword_list = [word.text for word in doc.ents] # Get each keyword as a string
    filtered_keyword_list = [w for w in keyword_list if " " not in w]
    filtered_keyword_list = [*set(filtered_keyword_list)] # Remove duplicates using a hash set
    return filtered_keyword_list

def extract_re(description: str) -> list[str]:
    keywords = re.findall(r'\b[a-zA-Z]{3,}\b', description)
    return keywords