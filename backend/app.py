from flask import Flask, send_from_directory
from databases.db import db
from databases.friends_db import Friend
from databases.users_db import User
from routes.friends import friend_page
from routes.users import user_page
from flask_cors import CORS
import os
from extensions import bcrypt

# Paths
frontend_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend"))
build_folder = os.path.join(frontend_folder, "build")

# Initialize Flask with static_folder and static_url_path
app = Flask(
    __name__,
    static_folder=os.path.join(build_folder, "static"),
    static_url_path="/static"
)
bcrypt.init_app(app)
# Enable CORS
CORS(app, supports_credentials=True, origins="*")

# Configure database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///friends.db"
# Turn off tracking modifications to save memory ....True ->>>	Tracks all changes in real-time, uses extra memory
#False ->>>	Tracks changes only when session.commit() is called, uses less memory.
app.config["SQLALCHEMY_BINDS"] = {
    "users": "sqlite:///users.db"
}
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# Serve React index.html
@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    file_path = os.path.join(build_folder, filename)
    if os.path.exists(file_path):
        return send_from_directory(build_folder, filename)
    return send_from_directory(build_folder, "index.html"), 200

# Handle 404 errors (for React Router)
@app.errorhandler(404)
def not_found(e):
    return send_from_directory(build_folder, "index.html"), 200

# Register blueprint
app.register_blueprint(friend_page, url_prefix="/")
app.register_blueprint(user_page, url_prefix="/user")

# Run app on Render
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Use PORT from environment variable
    app.run(host="0.0.0.0", port=port, debug=True)

#i was facing a circular import error before.
# In simple terms:
# app.py was trying to import user_page from routes/users.py.
# At the same time, routes/users.py was trying to import something (like bcrypt) from app.py.
# So both files are waiting on each other to finish loading — which causes a deadlock.