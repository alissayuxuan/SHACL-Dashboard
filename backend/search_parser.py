from rdflib import Graph, Namespace
from flask import jsonify

from graph_parser import get_prefix_dict, extract_sparql_result

# Define SHACL namespace
SH = Namespace("http://www.w3.org/ns/shacl#")


def addPrefix(input):
    prefix_dict = get_prefix_dict()
    #print(f"Prefix Dict:\n {prefix_dict}")

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

    count_query = """
        SELECT (COUNT(?result) as ?c)
        WHERE {
            ?report sh:result ?result .
    """

    if violation_type:
        sparql_query += f'?result sh:sourceConstraintComponent <{addPrefix(violation_type)}> .\n'
        count_query += f'?result sh:sourceConstraintComponent <{addPrefix(violation_type)}> .\n'

    if focus_node:
        sparql_query += f'?result sh:focusNode <{addPrefix(focus_node)}> .\n'
        count_query += f'?result sh:focusNode <{addPrefix(focus_node)}> .\n'

    if result_path:
        sparql_query += f'?result sh:resultPath <{addPrefix(result_path)}> .\n'
        count_query += f'?result sh:resultPath <{addPrefix(result_path)}> .\n'

    sparql_query += "}"
    count_query += "}"

    results = graph.query(sparql_query)
    total_entries = graph.query(count_query)

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
    print(pretty_output)

    # Return the result as JSON response
    if result_entries:
        return jsonify({
            "violation_entries": "\n".join(result_entries),
            "total_entries" : extract_sparql_result(total_entries)
        })
    else:
        return jsonify({"message": "No matching validation result found", "violationEntries": ""})

