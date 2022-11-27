import pytest 
from extract_test_cases import test_cases
from extraction_methods import extract_key_words

ENTRIES = [job for job in test_cases]

# Unit tests for Keyword Extraction Outside of Flask
@pytest.fixture()
def setup():
    return test_cases

def test_en_core_web_md(setup):
    for title in setup:
        keywords = extract_key_words(setup[title]["description"])
        for k in keywords:
            assert(k in setup[title]["keywords"])