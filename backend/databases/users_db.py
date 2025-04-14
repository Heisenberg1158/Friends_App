from .db import db
class User(db.Model):
    __bind_key__ = 'users' 
    __tablename__ = "user"
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    # user_id = db.Column(db.String(100), nullable=False) #this signifies he is in the friendlist of user with this id
    def to_json(self):
        return {
            "user_id": self.user_id,
            "username": self.username
        }