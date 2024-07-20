import os
from typing import Optional

from firebase_admin import firestore, initialize_app, App
from firebase_admin.firestore import firestore as Firestore

from lib.utils.env import env


class Firebase:
    app: Optional[App] = None


def db() -> Firestore.Client:
    return firestore.client(Firebase.app)


def initialize() -> App:
    if Firebase.app is None:
        Firebase.app = initialize_app()
        if env.is_local:
            os.environ["FIREBASE_AUTH_EMULATOR_HOST"] = "127.0.0.1:9099"
    return Firebase.app
