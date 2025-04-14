from app import app,db
with app.app_context():
    db.create_all()
with app.app_context():
    engine = db.engines['users']  # Get the engine for the 'users' bind
    db.metadata.create_all(engine) 