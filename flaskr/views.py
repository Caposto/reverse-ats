# Handles API endpoints: what is returned for a given api request
# FIXME: Request should recieve text and respond with JSON of keywords 

from flask import Blueprint, jsonify
from flaskr.pdf import extract_text, extract_key_words
# Blueprint documentation: https://flask.palletsprojects.com/en/2.2.x/tutorial/views/

main = Blueprint('main', __name__)

# Endpoint 
@main.route('/extract_keywords', methods=['POST'])
def get_keywords():
    keywords = ["react", "flask", "postman"]
    return jsonify({'keywords': keywords})