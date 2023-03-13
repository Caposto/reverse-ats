from flask import Blueprint, jsonify, request
from .extraction import extract_keywords_md

main = Blueprint('main', __name__)

# API Endpoint
@main.route('/extract_keywords', methods=['POST'])
def get_keywords():
    """Accepts POST requests and returns a JSON object of keywords"""
    job_description = request.get_json();
    job_description_text = job_description['description'] # Access Job Description Field in request
    keywords = extract_keywords_md(job_description_text) # list/array : extraction.py
    print(keywords)
    return jsonify(keywords)