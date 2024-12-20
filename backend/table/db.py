from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def json(self):
        return {'id': self.id, 'name': self.name, 'email': self.email}


class Item(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(500), nullable=False)
    images = db.Column(db.JSON, nullable=False)  # Store image URLs or paths
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='items')  # Link back to User

    def json(self):
        return {
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'description': self.description,
            'images': self.images,
            'user_id': self.user_id
        }

User.items = db.relationship('Item', back_populates='user', lazy=True)  # Link from User to Items
