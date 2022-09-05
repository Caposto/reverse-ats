import PyPDF2
import os

# FIXME: Create a folder that holds all of the Resumes. Will later turn that into an SQL Database

def extract_text(pdf):
    """Method that accepts a pdf file/path to pdf file as its argument
       and uses PyPDF2 to scrape and then return a dictionary of keywords"""
    
    pdf = open(pdf, 'rb')
    pdf_reader = PyPDF2.PdfFileReader(pdf)
    page = pdf_reader.getPage(0) # Should always be one page since only accepting 1 page resumes
    return page.extractText()
