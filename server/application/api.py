from flask import Blueprint, jsonify, request, abort
from json import dumps
from marshmallow import Schema, fields, ValidationError
from spacy import load
from .extraction import extract_keywords_md

main = Blueprint('main', __name__)

# Schema accepts a single field: string
class RequestSchema(Schema):
    description = fields.String(required=True)

# Load the spacy model
nlp = load("en_core_web_md")

# API Endpoint
@main.route('/extract_keywords', methods=['POST'])
def get_keywords():
    """Accepts POST requests and returns a JSON object of keywords"""
    if request.method == 'POST':
        # Validate the request body using the schema
        schema = RequestSchema()
        request_body = request.get_json();

        try:
            result = schema.load(request_body)
        except ValidationError as err:
            return jsonify(err.message, 400)

        job_description_text = dumps(result)
        keywords = extract_keywords_md(job_description_text, nlp) # list/array : extraction.py
        return jsonify(keywords), 200
    else:
        abort(405) # Exit with status code 405 : Method not allowed