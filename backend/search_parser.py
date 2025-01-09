from rdflib import Graph, Namespace
from flask import jsonify

from graph_parser import get_prefix_dict

# Define SHACL namespace
SH = Namespace("http://www.w3.org/ns/shacl#")


def addPrefix(input):
    prefix_dict = get_prefix_dict()
    print(f"Prefix Dict:\n {prefix_dict}")

    if input in prefix_dict:
        return prefix_dict[input] + input
    else:
        print("no matching prefix found!")
        return input


def search(graph: Graph, violation_type=None, focus_node=None, result_path=None):

    sparql_query = """
        SELECT ?report ?result
        WHERE {
            ?report sh:result ?result .
        
    """

    if violation_type:
        sparql_query += f'?result sh:sourceConstraintComponent <{addPrefix(violation_type)}> .\n'
    if focus_node:
        sparql_query += f'?result sh:focusNode <{addPrefix(focus_node)}> .\n'
    if result_path:
        sparql_query += f'?result sh:resultPath <{addPrefix(result_path)}> .\n'

    sparql_query += "}"

    print(f"\033[32m query: \n{sparql_query}\033[0m")

    # Execute the query
    results = graph.query(sparql_query)

    print(f"\033[33m results: \n{results}\033[0m")


    # If matches are found, convert them to a formatted string
    result_entries = []
    for row in results:
        result_node = row.result
        entry = f"sh:result [\n"
        for predicate, obj in graph.predicate_objects(result_node):
            entry += f"    {predicate.n3(graph.namespace_manager)} {obj.n3(graph.namespace_manager)} ;\n"
        entry = entry.rstrip(" ;\n") + "\n].\n"
        result_entries.append(entry)

    # Format the output with line breaks
    pretty_output = "\n\n".join(result_entries)

    # Print the formatted output
    print("\033[34mFormatted Output:\033[0m\n")
    print(pretty_output)

    # Return the result as a JSON response
    if result_entries:
        return jsonify({"violationEntries": "\n".join(result_entries)})
    else:
        return jsonify({"message": "No matching validation result found", "violationEntries": ""})

