from .db import db

class Friend(db.Model):
    id  = db.Column(db.Integer ,primary_key = True)
    name = db.Column(db.String(100) ,nullable = False)
    role = db.Column(db.String(50), nullable=False)
    desc = db.Column(db.Text, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    img_url = db.Column(db.String(200), nullable=True)
    frnd_id = db.Column(db.Integer,nullable=False)  # Foreign key to user table
    def to_json(self):
        return {
          "id":self.id,
          "name":self.name,
          "role":self.role,
          "description":self.desc,
          "gender":self.gender,
          "img_url":self.img_url,
        }
    