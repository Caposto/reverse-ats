from flask import Blueprint, jsonify, request
from flaskr.extraction import extract_keywords_md

# Blueprint documentation: https://flask.palletsprojects.com/en/2.2.x/tutorial/views/
# view: handles requests to the flask application
# blueprint: Organizes views by abstracting them away from individual applications. Blueprints can be reused across multiple apps


main = Blueprint('main', __name__)

# API Endpoint - POST method since GET is capped at 2000 characters so cannot send long job descriptions
@main.route('/extract_keywords', methods=['POST'])
def get_keywords():
    job_description = request.get_json();
    job_description_text = job_description['description']
    keywords = extract_keywords_md(job_description_text) # list/array
    return jsonify(keywords)
