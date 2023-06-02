import os
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from config import ProductionConfig

env_path = os.path.join(os.getcwd(), 'env')
load_dotenv(env_path)

def init_app():
  """Initialize the core application"""
  app = Flask(__name__, instance_relative_config=True)
  app.config.from_object(ProductionConfig) # Configure app from config.py
  cors = CORS(app)
  app.config['CORS_HEADERS'] = 'Content-Type'

  with app.app_context():
    # Include Routes
    from . import routes

    # Register Blueprints
    from .api import main
    app.register_blueprint(main) # Register API

    return app 

