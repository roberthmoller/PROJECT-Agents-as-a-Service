from typing import Optional

from firebase_admin import firestore, initialize_app, App
from firebase_admin.firestore import firestore as Firestore


class Firebase:
    app: Optional[App] = None


def db() -> Firestore.Client:
    return firestore.client(Firebase.app)


def initialize() -> App:
    if Firebase.app is None:
        Firebase.app = initialize_app()
    return Firebase.app
