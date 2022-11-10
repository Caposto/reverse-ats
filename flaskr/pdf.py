import PyPDF2
import spacy
import os

# FIXME: Create a folder that holds all of the Resumes. Will later turn that into an SQL Database
# Working with PDFs in FLASK: https://www.geeksforgeeks.org/working-with-pdf-files-in-python/
# https://towardsdatascience.com/keyword-extraction-process-in-python-with-natural-language-processing-nlp-d769a9069d5c
# spacy looks like a good option, I am not going to build my own NLP model for this project, I would rather just use a pre-built one, or multiple pre-built ones and cross reference their results21

def extract_text(pdf):
    """Method that accepts a pdf file/path to pdf file as its argument
       and uses PyPDF2 to scrape and then return a dictionary of keywords"""
    
    pdf = open(pdf, 'rb')
    pdf_reader = PyPDF2.PdfFileReader(pdf)
    page = pdf_reader.getPage(0) # Should always be one page since only accepting 1 page resumes
    return page.extractText()

def extract_key_words(description):
    """Accepts a string and uses spacy to return the keywords"""
    nlp = spacy.load("en_core_web_md")
    doc = nlp(description)
    keyword_list = [word.text for word in doc.ents]
    return keyword_list
