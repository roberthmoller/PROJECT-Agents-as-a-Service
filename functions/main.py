from agraffe import Agraffe
from agraffe.services.google_cloud_functions import HttpCycle
from firebase_functions import https_fn, identity_fn
from api import app


@https_fn.on_request()
def api(req: https_fn.Request):
    return Agraffe(app, HttpCycle)(request=req)


@identity_fn.before_user_created()
def created_noop(event: identity_fn.AuthBlockingEvent) -> identity_fn.BeforeCreateResponse | None:
    print("Before user created: {0}".format(event))
