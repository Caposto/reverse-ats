def test_extraction(function):
    # Read description from text file
    with open('description.txt', 'r') as f:
        description = f.read()
    
    keywords = function(description)
    return(description)


if __name__ == "__main__":
    test_extraction(print)