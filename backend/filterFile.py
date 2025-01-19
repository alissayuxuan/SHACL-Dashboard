#from uploadFile import file 
from flask import Flask, request, jsonify, session
from rdflib import Graph
from graph_parser import analyze_graph
from filter_parser import filterResultPath, filterSourceConstraintComponent, filterNode

import os

filter_result = {}
filter_result['lastAnalysis'] = 0


def filter(graph, category, input):
    if category == 'Violated FocusNodes':
        filter_result['lastAnalysis'] = filterNode(graph, input)
    if category == 'Violated ResultPaths' :
        filter_result['lastAnalysis'] = filterResultPath(graph, input)
    if category == 'Violation Types':
        filter_result['lastAnalysis'] = filterSourceConstraintComponent(graph, input)


    result = {
        'success': True,
        'data': filter_result['lastAnalysis']
    }


    return jsonify(result)