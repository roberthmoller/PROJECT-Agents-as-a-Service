from pyrebase import initialize_app

firebase_config = {
    "apiKey": "AIzaSyBeHOHnHOWrvGt-T41BeAm2-iUD6svrbjU",
    "authDomain": "agents-as-a-service.firebaseapp.com",
    "projectId": "agents-as-a-service",
    "storageBucket": "agents-as-a-service.appspot.com",
    "messagingSenderId": "666361884823",
    "appId": "1:666361884823:web:618247285c2df5fe76b9d2",
    "measurementId": "G-9BFRGJBQG3",
    "databaseURL": "",
}

app = initialize_app(firebase_config)
client_auth = app.auth()
