from flask import Flask, request, jsonify
from rdflib import Graph

from parser import analyze_graph

RED = "\033[31m"
GREEN = "\033[32m"
YELLOW = "\033[33m"
RESET = "\033[0m"

# In-memory storage for analysis result
analysis_results = {}

def upload_file():
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    file = request.files['file']

    if file:
        graph = Graph()
        try:
            # Attempt to parse the file in various formats
            graph.parse(file, format='ttl')  # Turtle format
        except:
            try:
                graph.parse(file, format='xml')  # RDF/XML
            except:
                try:
                    graph.parse(file, format='rdf')  # General RDF
                except:
                    return jsonify({'error': 'Unsupported format'}), 400

        # Analyze parsed graph
        print(f"{RED}HERE!{RESET}")

        analysis_result = analyze_graph(graph)
        print("ANALYSIS: ", analysis_result)

        # Store result in temporary storage
        analysis_results['last_analysis'] = analysis_result

        #return_value = jsonify({'status': 'File parsed successfully', 'analysis': analysis_result})

        return jsonify({'status': 'File parsed successfully'})
    return jsonify({'error': 'No file uploaded'}), 400


def get_result():
    print(f"{YELLOW}HERE!!!!!!!{RESET}")
    print(f"{YELLOW}{analysis_results}{RESET}")
    if 'last_analysis' in analysis_results:
        print(f"{YELLOW}if{RESET}")
        return jsonify({'analysis': analysis_results['last_analysis']})
    else:
        print(f"{YELLOW}else!{RESET}")
        return jsonify({'error': 'No analysis result available'}), 404