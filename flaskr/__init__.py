import PyPDF2
import os
from flaskr.pdf import extract_text
from flask import Flask, render_template
from dotenv import load_dotenv
from flaskr.config import DevelopmentConfig

env_path = os.path.join(os.getcwd(), 'env')
load_dotenv(env_path)

# Working with PDFs in FLASK: https://www.geeksforgeeks.org/working-with-pdf-files-in-python/

app = Flask(__name__, instance_relative_config=True)
app.config.from_object(DevelopmentConfig)

# Create Path to resume pdf
parent_dir = os.path.join(os.getcwd(), 'flaskr')
resume_path = os.path.join(parent_dir, "resume.pdf")

@app.route("/")
def hello_world():
    pdf_text = extract_text(resume_path)
    return render_template("index.html", pdf_text=pdf_text)

if __name__ == "__main__":
    app.run(debug=True)