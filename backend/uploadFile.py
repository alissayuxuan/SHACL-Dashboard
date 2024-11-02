from flask import Flask, request, jsonify
from rdflib import Graph

app = Flask(__name__)

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
        # Process the parsed graph
        return jsonify({'status': 'File parsed successfully'})
    return jsonify({'error': 'No file uploaded'}), 400

