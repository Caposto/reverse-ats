from keybert import KeyBERT

def extract_keybert(description: str) -> list[str]:
    kw_model = KeyBERT()
    keywords = kw_model.extract_keywords(description)
    return keywords