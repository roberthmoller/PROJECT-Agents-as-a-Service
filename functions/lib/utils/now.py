from datetime import datetime


def now():
    return str(datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3])
