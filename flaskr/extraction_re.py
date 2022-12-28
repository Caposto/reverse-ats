import re

def extract_re(description: str) -> list[str]:
    keywords = re.findall(r'\b[a-zA-Z]{3,}\b', description)
    return keywords