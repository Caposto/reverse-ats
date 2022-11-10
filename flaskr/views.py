# Handling API Endpoints

from flask import Blueprint, jsonify, request
from flaskr.pdf import extract_text, extract_key_words
# Blueprint documentation: https://flask.palletsprojects.com/en/2.2.x/tutorial/views/

main = Blueprint('main', __name__)

# Endpoint 
@main.route('/extract_keywords', methods=['POST'])
def get_keywords():
    job_description = request.get_json();
    job_description_text = job_description['description']
    keywords = extract_key_words(job_description_text)
    print(keywords)
    return jsonify(keywords)
