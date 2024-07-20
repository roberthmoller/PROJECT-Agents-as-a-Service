from agraffe import Agraffe
from agraffe.services.google_cloud_functions import HttpCycle
from firebase_functions import https_fn, options

from api import app
from lib.utils.firebase.admin import initialize

initialize()


@https_fn.on_request(timeout_sec=3_600, memory=options.MemoryOption.GB_1)
def api(req: https_fn.Request):
    return Agraffe(app, HttpCycle)(request=req)
