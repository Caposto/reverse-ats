import PyPDF2
import spacy

# Working with PDFs in FLASK: https://www.geeksforgeeks.org/working-with-pdf-files-in-python/
# https://towardsdatascience.com/keyword-extraction-process-in-python-with-natural-language-processing-nlp-d769a9069d5c

def extract_text(pdf):
    """Method that accepts a pdf file/path to pdf file as its argument
       and uses PyPDF2 to scrape and then return a dictionary of keywords"""
    pdf = open(pdf, 'rb')
    pdf_reader = PyPDF2.PdfFileReader(pdf)
    page = pdf_reader.getPage(0) # Should always be one page since only accepting 1 page resumes
    return page.extractText()

# Uses "en_core_web_md"
def extract_key_words(description):
    """Accepts a string and uses spacy to return the keywords"""
    nlp = spacy.load("en_core_web_md")
    doc = nlp(description)
    keyword_list = [word.text for word in doc.ents] # Get each keyword as a string
    return keyword_list

# Uses keyBERT