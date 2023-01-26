import os
from flaskr.extraction import extract_pdf_text, extract_keywords_md
from flask import Flask, render_template
from dotenv import load_dotenv
from flask_cors import CORS
from flaskr.config import DevelopmentConfig

env_path = os.path.join(os.getcwd(), 'env')
load_dotenv(env_path)

app = Flask(__name__, instance_relative_config=True)
app.config.from_object(DevelopmentConfig) # Configure app from config.py
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

from .views import main
app.register_blueprint(main) # Register API

# Create Path to Resume pdf
parent_dir = os.path.join(os.getcwd(), 'flaskr')
resume_path = os.path.join(parent_dir, "resume.pdf")

@app.route("/")
def hello_world():
    pdf_text = extract_pdf_text(resume_path) # get keywords from pdf file
    keywords = extract_keywords_lg(pdf_text) # Get list of keywords from pdf
    return render_template("index.html", keywords=keywords)

if __name__ == "__main__":
    app.run(debug=True)