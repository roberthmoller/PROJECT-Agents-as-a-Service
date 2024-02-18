# import datetime
#
#
# def current_time():
#     return str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3])
# code = "import datetime\ndef current_time():\n\treturn str(datetime.datetime.now().strftime(\"%Y-%m-%d %H:%M:%S.%f\")[:-3])\n\ndef foo():\n\tprint(\"bar\")"


code = """
import datetime

def current_time():
    return str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3])
    
def foo():
    print("bar")
"""

import ast




if __name__ == '__main__':
    method_handles = extract_methods(code)
    print("Methods:", list(method_handles.keys()))

    for method_name, method_handle in method_handles.items():
        print(f"Calling {method_name}")
        print(method_handle())
