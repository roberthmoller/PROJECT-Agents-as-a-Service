from datetime import datetime


def now():
    return date_to_str(datetime.now())


def date_to_str(date: datetime):
    return str(date.strftime("%Y-%m-%d %H:%M:%S.%f")[:-3])
