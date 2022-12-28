import nltk

def extract_nltk(description: str) -> list[str]:
    tokens = nltk.word_tokenize(description)
    # Remove stop words (common words such as "a", "an", "the", etc.)
    filtered_tokens = [token for token in tokens if token.lower() not in nltk.corpus.stopwords.words("english")]
    # Perform part-of-speech tagging to identify nouns
    pos_tags = nltk.pos_tag(filtered_tokens)
    # Extract the nouns
    nouns = [word for word, pos in pos_tags if pos.startswith("NN")]
    print(nouns)
    return nouns