from firebase_admin import initialize_app, auth, firestore

app = initialize_app()
db = firestore.client(app)
