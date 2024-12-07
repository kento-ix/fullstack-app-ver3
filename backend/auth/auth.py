from flask import Blueprint, request, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from table.db import db, User

# Create a Blueprint for authentication routes
auth = Blueprint('auth', __name__)

# Register user route
@auth.route('/api/flask/register', methods=['POST'])
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
        return make_response(jsonify({'message': 'Error creating user', 'error': str(e)}), 500)


# Login route
@auth.route('/api/flask/login', methods=['POST'])
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
        return make_response(jsonify({'message': 'Error during login', 'error': str(e)}), 500)
