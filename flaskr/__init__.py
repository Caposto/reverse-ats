import os
from flaskr.pdf import extract_text, extract_key_words
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flaskr.config import DevelopmentConfig

env_path = os.path.join(os.getcwd(), 'env')
load_dotenv(env_path)

db = SQLAlchemy()

app = Flask(__name__, instance_relative_config=True)
app.config.from_object(DevelopmentConfig) # see config.py
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

db.init_app(app)

from .views import main
app.register_blueprint(main)

# Create Path to resume pdf
parent_dir = os.path.join(os.getcwd(), 'flaskr')
resume_path = os.path.join(parent_dir, "resume.pdf")

@app.route("/")
def hello_world():
    pdf_text = extract_text(resume_path)
    keywords = extract_key_words(pdf_text)
    return render_template("index.html", keywords=keywords)

if __name__ == "__main__":
    app.run(debug=True)