# Represents resume object in sqlite database (if I end up using a database to hold multiple resumes)
from . import db

class Resume(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    content = db.Column(db.Text)
    keywords = db.Column(db.Text)