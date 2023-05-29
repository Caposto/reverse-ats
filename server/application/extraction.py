import re
from spacy import load

#################################################SPACY##############################################################

def extract_keywords_md(description: str, nlp_model = load("en_core_web_md")) -> list[str]:
    """Accepts a string and uses spacy to return the keywords as a list of strings using en_core_web_md"""
    doc = nlp_model(description)
    keyword_list = [word.text for word in doc.ents] # Get each keyword as a string
    filtered_keyword_list = [*set(keyword_list)] # Remove duplicates using a hash set
    return filtered_keyword_list

def extract_re(description: str) -> list[str]:
    keywords = re.findall(r'\b[a-zA-Z]{3,}\b', description)
    return keywords