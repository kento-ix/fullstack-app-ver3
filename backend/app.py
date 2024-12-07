from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  
from os import environ
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token
from datetime import timedelta
from dotenv import load_dotenv
import os

from table.db import db, User  # Import db and User from db.py

load_dotenv()

app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')
app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

db.init_app(app)  # Initialize db with app

jwt = JWTManager(app)

with app.app_context():
    db.create_all()

# create a test route
@app.route('/test', methods=['GET'])
def test():
  return jsonify({'message': 'The server is running'})


@app.route('/check-secret', methods=['GET'])
def check_secret():
    print("DEBUG: JWT_SECRET_KEY =", app.config.get('JWT_SECRET_KEY'))
    return jsonify({'message': 'Check complete'}), 200


# register user
@app.route('/api/flask/register', methods=['POST'])
def create_user():
  try:
    data = request.get_json()

    if 'password' not in data or not data['password']:
      return make_response(jsonify({'message': 'Password is required'}), 400)

    hashed_password = generate_password_hash(data['password'])
    new_user = User(name=data['name'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()  

    return jsonify({
        'id': new_user.id,
        'name': new_user.name,
        'email': new_user.email
    }), 201

  except Exception as e:
    return make_response(jsonify({'message': 'error creating user', 'error': str(e)}), 500)
  
# login 
@app.route('/api/flask/login', methods=['POST'])
def login():
  try:
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and check_password_hash(user.password, data['password']):
      access_token = create_access_token(identity=user.id)
      return make_response(jsonify({
        'message': 'Login successful',
        'access_token': access_token,
        'user': user.json()
      }), 200)

    return make_response(jsonify({'message': 'Invalid email or password'}), 401)
  except Exception as e:
    return make_response(jsonify({'message': 'error during login', 'error': str(e)}), 500)

  
# get all users
@app.route('/api/flask/users', methods=['GET'])
def get_users():
  try:
    users = User.query.all()
    users_data = [{'id': user.id, 'name': user.name, 'email': user.email} for user in users]
    return jsonify(users_data), 200
  except Exception as e:
    return make_response(jsonify({'message': 'error getting users', 'error': str(e)}), 500)
  
# get a user by id
@app.route('/api/flask/users/<id>', methods=['GET'])
def get_user(id):
  try:
    user = User.query.filter_by(id=id).first() # get the first user with the id
    if user:
      return make_response(jsonify({'user': user.json()}), 200)
    return make_response(jsonify({'message': 'user not found'}), 404) 
  except Exception as e:
    return make_response(jsonify({'message': 'error getting user', 'error': str(e)}), 500)
  
# update a user by id
@app.route('/api/flask/users/<id>', methods=['PUT'])
def update_user(id):
  try:
    user = User.query.filter_by(id=id).first()
    if user:
      data = request.get_json()
      user.name = data['name']
      user.email = data['email']

      if 'password' in data:
        user.password = generate_password_hash(data['password'])

      db.session.commit()
      return make_response(jsonify({'message': 'user updated'}), 200)
    return make_response(jsonify({'message': 'user not found'}), 404)  
  except Exception as e:
      return make_response(jsonify({'message': 'error updating user', 'error': str(e)}), 500)

# delete a user by id
@app.route('/api/flask/users/<id>', methods=['DELETE'])
def delete_user(id):
  try:
    user = User.query.filter_by(id=id).first()
    if user:
      db.session.delete(user)
      db.session.commit()
      return make_response(jsonify({'message': 'user deleted'}), 200)
    return make_response(jsonify({'message': 'user not found'}), 404) 
  except Exception as e:
    return make_response(jsonify({'message': 'error deleting user', 'error': str(e)}), 500)   