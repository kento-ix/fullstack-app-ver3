from flask import Blueprint, jsonify, make_response, request
from table.db import db, User, Item


item = Blueprint('item', __name__)

# upload items
@item.route('/api/flask/additem', methods=['POST'])
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

# Get all of the items information
@item.route('/api/flask/getitem', methods=['GET'])
def get_items():
   try:
      items = Item.query.all()
      items_data = [{'title': item.title, 'price': item.price, 'description':item.description, 'images':item.images, 'user_id':item.user_id} for item in items]
      return jsonify(items_data), 200
   except Exception as e:
      return make_response(jsonify({'message': 'error getting items', 'error': str(e)}), 500)
   
@item.route('/api/flask/getitem/<user_id>', methods=['GET'])
def user_item(user_id):
    try:
        user = User.query.filter_by(user_id=user_id).first()
        if not user:
            return make_response(jsonify({'message': 'not found user'}), 404)
        
        items = Item.query.filter_by(user_id=user_id).all()
        if not items:
            return make_response(jsonify({'message': 'not found this users items'}), 404)

        items_json = [item.json() for item in items]
        return make_response(jsonify({'user': user.json(), 'items': items_json}), 200)



    except Exception as e:
        return make_response(jsonify({'message': 'error searching user', 'error': str(e)}), 500)