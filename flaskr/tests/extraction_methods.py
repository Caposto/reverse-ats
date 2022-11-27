import spacy

# Uses "en_core_web_md"
def extract_key_words(description):
    """Accepts a string and uses spacy to return the keywords"""
    nlp = spacy.load("en_core_web_md")
    doc = nlp(description)
    keyword_list = [word.text for word in doc.ents] # Get each keyword as a string
    return keyword_list