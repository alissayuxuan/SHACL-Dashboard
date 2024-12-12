#from uploadFile import file 
from flask import Flask, request, jsonify, session
from rdflib import Graph
from graph_parser import analyze_graph
from filter_parser import filterResultPath, filterSeverity, filterSourceConstraintComponent, filterNode

import os

filter_result = {}
filter_result['lastAnalysis'] = 0


def filter(graph, category, input):
    print(len((graph)))
    print("categorie: " + str(category))
    print("input: " + str(input))

    if category == 'Violated FocusNodes':
        filter_result['lastAnalysis'] = filterNode(graph, input)
   #     filter_result['lastAnalysis'] = filterRes
        print(filter_result['lastAnalysis'])
    if category == 'Violated ResultPaths' :
        filter_result['lastAnalysis'] = filterResultPath(graph, input)
    if category == 'resultSeverity':
        filter_result['lastAnalysis'] = filterSeverity(graph, input)
    if category == 'Violation Types':
        filter_result['lastAnalysis'] = filterSourceConstraintComponent(graph, input)


    # ALISSA 11.12.24
    print("vor dem abschicken", filter_result['lastAnalysis'])

    result = {
        'success': True,
        'data': filter_result['lastAnalysis']
    }


    return jsonify(result)#jsonify({'status': 'successfull'})