from os import environ
from dotenv import load_dotenv

# Initalize enviornment variables 
load_dotenv()

class Config(object):
    DEBUG = False
    TESTING = False
    FLASK_APP=environ.get("FLASK_APP")
    FLASK_ENV=environ.get("FLASK_ENV")
    # SESSION_COOKIE_NAME = environ.get('SESSION_COOKIE_NAME')
    STATIC_FOLDER = 'static'
    TEMPLATES_FOLDER = 'templates'

class ProductionConfig(Config):
    pass

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True