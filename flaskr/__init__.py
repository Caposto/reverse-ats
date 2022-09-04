import PyPDF2
import os
from flask import Flask, render_template

# Working with PDFs in FLASK: https://www.geeksforgeeks.org/working-with-pdf-files-in-python/

app = Flask(__name__)

parent_dir = os.path.join(os.getcwd(), 'flaskr')
resume_path = os.path.join(parent_dir, "resume.pdf")

pdf = open(resume_path, 'rb')

pdf_reader = PyPDF2.PdfFileReader(pdf)

page = pdf_reader.getPage(0)

@app.route("/")
def hello_world():
    pdf_text = page.extract_text()
    return render_template("index.html", pdf_text=pdf_text)

if __name__ == "__main__":
    app.run(debug=True)