from flask import Blueprint , request,jsonify
from databases.db import db
from databases.friends_db import *
from functools import wraps
import jwt

friend_page = Blueprint("friends",__name__)

SECRET_KEY =  "5f2b5c6e6d3f4e8a8d9b0a1c2e7d6f8c7b3e4f5a6d8e9f0b1c2d3e4f5a6b7c8d"

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        
        try:
            token = token.split(" ")[1]  # Extract token from 'Bearer <token>'
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            user_id = data['user_id']

        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired, please log in again"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        
        return f(user_id, *args, **kwargs)
    
    return decorated

#create friend and get all friends
@friend_page.route("/api/friends/",methods = ["POST","GET"])
@token_required
def create_friend(user_id):
   # print("Authorization Header:", request.headers.get("Authorization"))
    if request.method=='POST':
        data = request.json # Convert JSON string to Python dictionary
        #validate data
        required_fields = ["name", "role", "description", "gender"]
         
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"'{field}' field is required."}), 400

        name = data.get("name")
        role = data.get("role")
        desc = data.get("description")
        gender = data.get("gender")
    
        if gender== "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        else :
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        
        new_friend = Friend(name=name, role=role, desc=desc, gender= gender, img_url=img_url,frnd_id=user_id)
        db.session.add(new_friend)
        db.session.commit()
        return jsonify(new_friend.to_json()), 201
    else : # GET request
        friends = Friend.query.filter_by(frnd_id=user_id).all()
        result = []
        for friend in friends:
            result.append(friend.to_json())
        return jsonify(result)
    
# delete friend
@friend_page.route("/api/friends/delete/<int:id>",methods = ["PATCH"])
@token_required
def delete_friend(user_id,id):
    try:
        friend = Friend.query.filter_by(id= id,frnd_id=user_id).all()[0]
    except IndexError:  # if user not found
        return jsonify({"error":"Friend not found"}), 404
    
    db.session.delete(friend)
    db.session.commit()
    return jsonify({"msg":"Friend deleted"}), 200

#update
@friend_page.route("/api/friends/update/<int:id>",methods = ["POST"])
@token_required
def update(user_id,id):
    try:
        friend = Friend.query.filter_by(id= id,frnd_id=user_id).all()[0]
    except IndexError:  # if user not found
        return jsonify({"error":"Friend not found"}), 404
    
    data = request.json
    
    friend.name = data.get("name",friend.name)
    friend.role = data.get("role",friend.role)
    friend.desc = data.get("description",friend.desc)
    friend.gender = data.get("gender",friend.gender)

    db.session.commit()
    return jsonify(friend.to_json()),200




