import ast
import os
import site
import sys
from typing import Callable, List

import pip


def imports_from_code(code: str) -> list[str]:
    tree = ast.parse(code)
    raw_imports = []
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for subnode in node.names:
                raw_imports.append(subnode.name)
        elif isinstance(node, ast.ImportFrom):
            raw_imports.append(node.module)
    return raw_imports


def extract_methods(code: str) -> dict[str, Callable]:
    exec(code, globals())
    tree = ast.parse(code)
    method_names = [node.name for node in ast.walk(tree) if isinstance(node, ast.FunctionDef)]
    return {name: globals()[name] for name in method_names}


def import_dependencies(imports: List[str]):
    if not os.path.exists(site.USER_SITE):
        os.makedirs(site.USER_SITE)
    sys.path.insert(0, site.USER_SITE)
    for package in imports:
        pip.main(["install", package])


def import_and_run(imports: List[str], func: Callable):
    def wrapper(*args, **kwargs):
        import_dependencies(imports)
        return func(*args, **kwargs)

    return wrapper


# if __name__ == '__main__':
    # import yfinance as yf
    # yf.utils.
    # stock = yf.Ticker("AAPL")
    # print(stock.info)

    # code = "import yfinance as yf\n\n" + \
    #        "stock = yf.Ticker(\"Apple\")\n" + \
    #        "print(stock.info)\n"
    #
    # import_dependencies(["yfinance"])
    # eval(code)
