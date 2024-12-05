#from uploadFile import file 
from flask import Flask, request, jsonify, session
from rdflib import Graph
from graph_parser import analyze_graph, filterResultPath, filterSeverity, filterSourceConstraintComponent, filterNode

import os

filter_result = {}

def filter(graph, category, input):
    


   # file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    #file.save(file_path)
    """
    if not file or file == "":
        print("jjjjjjjjjjjj")
        return jsonify({"error": "Missing file"}), 400


    if not file.filename.endswith('.ttl'):
        print("jetzt leider nein")
    else:
        print("doppel sehr gut")

    #UPLOAD_FOLDER = 'C:/Users/lukas/Downloads'
    graph.parse(file, format='ttl')
    
    print("joooo")
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
                print("ffffff")
                return jsonify({'error': 'Unsupported format'}), 400

    """
    print("categorie: " + str(category))
    print("input: " + str(input))

    if category == 'focusNode':
        print("typeeeeeeee" + str(type(graph)))

        filterRes = filterNode(graph, input)

        print(filterRes)
        

       # print("typeeeeeeee" + str(type(newGraph)))
        #filter_result['lastAnalysis'] = analyze_graph(newGraph)
        #print(filter_result.get('lastAnalysis'))
    if category == 'resultPath' :
        newGraph = filterResultPath(graph, input)
        filter_result['lastAnalysis'] = analyze_graph(newGraph)
    if category == 'resultSeverity':
        newGraph = filterSeverity(graph, input)
        filter_result['lastAnalysis'] = analyze_graph(newGraph)
    if category == 'filterSourceConstraintComponent':
        newGraph = filterSourceConstraintComponent(graph, input)
        filter_result['lastAnalysis'] = analyze_graph(newGraph)
    if category == 'sourceShape':
        newGraph = filterNode(graph, input)
        filter_result['lastAnalysis'] = analyze_graph(newGraph)

    return jsonify({'status': 'successfull'})
    




