from flask import Blueprint , request,session,jsonify
from databases.db import db
from databases.users_db import *
from databases.friends_db import *
from extensions import bcrypt 
import jwt
import datetime
from functools import wraps

user_page = Blueprint("users",__name__)
SECRET_KEY =  "5f2b5c6e6d3f4e8a8d9b0a1c2e7d6f8c7b3e4f5a6d8e9f0b1c2d3e4f5a6b7c8d"

# JWT Token Required Decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        
        try:
            token = token.split(" ")[1]  # Extract token from 'Bearer <token>'
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
            if not current_user:
                return jsonify({"error": "User not found"}), 404
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired, please log in again"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated


@user_page.route('/signup/',methods = ['POST'])
def signup():
    data = request.json
    required_field = ['username','password']
    for field in required_field:
        if not data.get(field):
            return jsonify({"error":f"'{field}' is required"}),400
    
    name = data.get('username')
    password = data.get('password')
    hassed_password = bcrypt.generate_password_hash(password).decode('utf-8') 

    try:
        user = User.query.filter_by(username = name).all()[0]
        return jsonify({"error":"User already exists"}),400
    except IndexError:
        new_user = User(username=name,password=hassed_password)
        db.session.add(new_user)
        db.session.commit()
        # to_json() ---- object -> dictionary 
        # jsonify()--- dictionary-> json
        return jsonify({"message": "Account Created"}), 200

@user_page.route('/login/',methods = ['POST'])
def login():
    data = request.json
    required_field = ['username','password']
    for field in required_field:
        if not data.get(field):
            return jsonify({"error":f"'{field}' is required"}),400
    
    name = data.get('username')
    password = data.get('password')
    try:
        user = User.query.filter_by(username = name).all()[0]
        if bcrypt.check_password_hash(user.password, password):
            token = jwt.encode({
                'user_id': user.user_id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
            }, SECRET_KEY, algorithm="HS256")

            return jsonify({"token": token, "message": "Login successful"}), 200
        else:
            return jsonify({"error": "Invalid password"}), 400
    except IndexError:
        return jsonify({"error":"User not found"}),404

@user_page.route('/logout/',methods = ['POST'])
@token_required
def logout(current_user):
    return jsonify({"message": "Logout successful."}), 200


@user_page.route('/delete/',methods = ['DELETE'])
@token_required
def delete(current_user): 
    db.session.delete(current_user)
    user_id = current_user.user_id
    friends = Friend.query.filter_by(frnd_id=user_id).all()
    for friend in friends:
        db.session.delete(friend)
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200

@user_page.route('/update/',methods = ['PATCH'])
@token_required
def update(current_user): 
    data = request.json
    
    if not data.get('oldpassword'):
        return jsonify({"error": "Enter your current password"}), 400

    new_username = data.get('username', current_user.username)
    old_password = data.get('oldpassword')
    new_password = data.get('newpassword', None)

    if new_username != current_user.username:
        # Make sure username isn't taken by another user
        if User.query.filter_by(username=new_username).first():
            return jsonify({"error": "Username already exists"}), 400

    if not bcrypt.check_password_hash(current_user.password, old_password):
        return jsonify({"error": "Incorrect password"}), 400

    current_user.username = new_username
    if new_password and new_password != old_password:
        current_user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')

    db.session.commit()
    return jsonify({"message": "Account updated"}), 200

    
    

    

    


       
    

