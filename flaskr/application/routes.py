from flask import current_app as app

@app.route("/")
def hello_world():
    return "<h1>Reverse ATS API</h1>"