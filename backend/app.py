from flask import Flask, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ
from flask_jwt_extended import JWTManager
from datetime import timedelta
from dotenv import load_dotenv
import os

from table.db import db, User  # Import db and User from db.py
from auth.auth import auth  # Import the auth blueprint
from user.routes import user  # Import the user routes

load_dotenv()

app = Flask(__name__)

CORS(app)

# Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')
app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# Initialize the database and JWT
db.init_app(app)
jwt = JWTManager(app)

#refister blueprint
app.register_blueprint(auth)
app.register_blueprint(user)

with app.app_context():
    db.create_all()

# Create a test route 
@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'The server is running'})

@app.route('/check-secret', methods=['GET'])
def check_secret():
    print("DEBUG: JWT_SECRET_KEY =", app.config.get('JWT_SECRET_KEY'))
    return jsonify({'message': 'Check complete'}), 200
