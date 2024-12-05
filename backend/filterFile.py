#from uploadFile import file 
from flask import Flask, request, jsonify, session
from rdflib import Graph
from graph_parser import analyze_graph, filterResultPath, filterSeverity, filterSourceConstraintComponent, filterNode

import os

filter_result = {}

def filter(graph, category, input):
    print("categorie: " + str(category))
    print("input: " + str(input))

    if category == 'focusNode':
        filterRes = filterNode(graph, input)

        print(filterRes)
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