from os import environ
from dotenv import load_dotenv

# Initalize enviornment variables 
load_dotenv()

class Config(object):
    DEBUG = False
    TESTING = False
    FLASK_APP=environ.get("FLASK_APP")
    FLASK_ENV=environ.get("FLASK_ENV")
    STATIC_FOLDER = 'static'
    TEMPLATES_FOLDER = 'templates'

class ProductionConfig(Config):
    FLASK_DEBUG=0

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True