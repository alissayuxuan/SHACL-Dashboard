from flask import Flask, request, jsonify, session
from rdflib import Graph

from graph_parser import analyze_graph

RED = "\033[31m"
GREEN = "\033[32m"
YELLOW = "\033[33m"
RESET = "\033[0m"

# In-memory storage for analysis result
analysis_results = {}



def upload_file(graph):

    """
    graph = Graph()
    try:
        graph.parse(file, format='turtle')
    except Exception as e:
        print("Error during parsing:", str(e))  # Nur Fehlertext ausgeben
        return jsonify({'error': 'Failed to parse file'}), 400
 #   graph.parse(file, format='turtle')  # Dateiinhalt parsen
    """
    
    analysis_result = analyze_graph(graph)  
 #   print(f"{GREEN}ANALYSIS:  {analysis_result}{RESET}")

        # Store result in temporary storage
    analysis_results['last_analysis'] = analysis_result
    return jsonify({'status': 'File parsed successfully'})

    """
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
        print(f"{GREEN}ANALYSIS:  {analysis_result}{RESET}")

        # Store result in temporary storage
        analysis_results['last_analysis'] = analysis_result

        #return_value = jsonify({'status': 'File parsed successfully', 'analysis': analysis_result})

        return jsonify({'status': 'File parsed successfully'})
    return jsonify({'error': 'No file uploaded'}), 400
"""

def get_result():
  #  print(f"{YELLOW}HERE!!!!!!!{RESET}")
   # print(f"{YELLOW}{analysis_results}{RESET}")
    if 'last_analysis' in analysis_results:
       # print(f"{YELLOW}last_analysis{RESET}")
        return jsonify({'analysis': analysis_results['last_analysis']})
    else:
        print(f"{YELLOW}no last_analysis{RESET}")
        return jsonify({'error': 'No analysis result available'}), 404
    




def getFile():
    return file
