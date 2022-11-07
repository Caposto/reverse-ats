# Represents resume object in sqlite database (if I end up using a database to hold multiple resumes)
from . import db

class Resume(db.Model):
    id = db.Column(db.Integer, primary_key=True) # Resume Id
    date = db.Column(db.DateTime)
    content = db.Column(db.Text) # Raw Resume Content
    keywords = db.Column(db.Text) # Keywords from resume

class Comparisons(db.Model):
    id = db.Column(db.Integer, primary_key=True) # Job Id
    description = db.Column(db.Text) # Keywords from description
    keywords = db.Column(db.Text) # Keywords from resume