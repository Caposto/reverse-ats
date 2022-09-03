from flask import Flask, render_template

# Working with PDFs in FLASK: https://www.geeksforgeeks.org/working-with-pdf-files-in-python/

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template("index.html")
