#from uploadFile import file 
from flask import Flask, request, jsonify, session
from rdflib import Graph
from graph_parser import analyze_graph
from filter_parser import filterResultPath, filterSeverity, filterSourceConstraintComponent, filterNode

import os

filter_result = {}

def filter(graph, category, input):
    print(len((graph)))
    print("categorie: " + str(category))
    print("input: " + str(input))

    if category == 'Violated FocusNodes':
        filterRes = filterNode(graph, input)

        print(filterRes)
    if category == 'Violated ResultPaths' :
        newGraph = filterResultPath(graph, input)
        filter_result['lastAnalysis'] = analyze_graph(newGraph)
    if category == 'resultSeverity':
        newGraph = filterSeverity(graph, input)
        filter_result['lastAnalysis'] = analyze_graph(newGraph)
    if category == 'Violation Types':
        newGraph = filterSourceConstraintComponent(graph, input)
        filter_result['lastAnalysis'] = analyze_graph(newGraph)
    if category == 'sourceShape':
        newGraph = filterNode(graph, input)
        filter_result['lastAnalysis'] = analyze_graph(newGraph)

    return jsonify({'filter Ergebnis': filter_result})
    