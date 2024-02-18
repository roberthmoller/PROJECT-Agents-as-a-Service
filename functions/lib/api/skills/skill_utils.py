import ast


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


def extract_methods(code: str) -> dict[str, callable]:
    exec(code, globals())
    tree = ast.parse(code)
    method_names = [node.name for node in ast.walk(tree) if isinstance(node, ast.FunctionDef)]
    return {name: globals()[name] for name in method_names}
