from flask import Blueprint, jsonify, make_response, request
from table.db import db, User, Item
from werkzeug.security import generate_password_hash

user = Blueprint('user', __name__)

# Get all users
@user.route('/api/flask/users', methods=['GET'])
def get_users():
  try:
    users = User.query.all()
    users_data = [{'id': user.id, 'name': user.name, 'email': user.email} for user in users]
    return jsonify(users_data), 200
  except Exception as e:
    return make_response(jsonify({'message': 'error getting users', 'error': str(e)}), 500)

# Get a user by ID
@user.route('/api/flask/users/<id>', methods=['GET'])
def get_user(id):
  try:
    user = User.query.filter_by(id=id).first()
    if user:
      return make_response(jsonify({'user': user.json()}), 200)
    return make_response(jsonify({'message': 'user not found'}), 404) 
  except Exception as e:
    return make_response(jsonify({'message': 'error getting user', 'error': str(e)}), 500)

# Update a user by ID
@user.route('/api/flask/users/<id>', methods=['PUT'])
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

# Delete a user by ID
@user.route('/api/flask/users/<id>', methods=['DELETE'])
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


# add 
@user.route('/api/flask/additem', methods=['POST'])
def create_item():
    try:
        data = request.get_json()

        missing_fields = [key for key in ('title', 'price', 'description', 'images', 'user_id') if key not in data]
        if missing_fields:
            return make_response(jsonify({'message': f'Missing fields: {", ".join(missing_fields)}'}), 400)
        
        user_id = data['user_id']
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return make_response(jsonify({'message': 'User not found'}), 400)

        new_item = Item(
            title=data['title'],
            price=data['price'],
            description=data['description'],
            images=data['images'],
            user_id=user_id
        )

        db.session.add(new_item)
        db.session.commit()

        return make_response(jsonify({'message': 'Item created successfully', 'item': new_item.json()}), 201)

    except Exception as e:
        return make_response(jsonify({'message': 'Error creating item', 'error': str(e)}), 500)

#