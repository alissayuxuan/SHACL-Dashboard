# TODO: implement parser function

from rdflib import Graph, URIRef
from rdflib.plugins.sparql.processor import prepareQuery


import os
from flask import jsonify


listePrefixe = []
prefix_dict = {}

RED = "\033[31m"
GREEN = "\033[32m"
YELLOW = "\033[33m"
RESET = "\033[0m"


def getNamespaces(graph):
    liste = []
    for prefix, namespace in graph.namespaces():
        liste.append(namespace)
    return liste



queryGesamtzahlViolations = """
SELECT (COUNT(?result) as ?c)
WHERE {
    ?report sh:result ?result .
}
"""


queryAnzahlViolatingNodes = """
SELECT (COUNT(DISTINCT ?focusNode) as ?c)
WHERE {
    ?report sh:result ?result .
    ?result sh:focusNode ?focusNode .

}
"""

queryAnzahlViolatingResultPaths = """
SELECT (COUNT(DISTINCT ?resultPath) as ?c)
WHERE {
    ?report sh:result ?result .
    ?result sh:resultPath ?resultPath .
    }
"""

queryMostFrequentViolationType = """
SELECT ?sourceConstraintComponent (COUNT(*) AS ?count)
WHERE {
    ?report sh:result ?result .
    ?result sh:sourceConstraintComponent ?sourceConstraintComponent .
}
GROUP BY ?sourceConstraintComponent
ORDER BY DESC(?count)
LIMIT 1 
"""

queryMostViolatingNode = """
SELECT ?focusNode (COUNT(*) AS ?count)
WHERE {
  ?report sh:result ?result .
  ?result sh:focusNode ?focusNode .
}
GROUP BY ?focusNode
ORDER BY DESC(?count)
LIMIT 1 

"""

queryMostFrequenResultPath = """
SELECT ?resultPath (COUNT(*) AS ?count)
WHERE {
  ?report sh:result ?result .
  ?result sh:resultPath ?resultPath .
}
GROUP BY ?resultPath
ORDER BY DESC(?count)
LIMIT 1 
"""

def queryFocusNodeDistributionFunction(graph):
    queryFocusNodeDistribution = """
    SELECT ?focusNode (COUNT(*) as ?count)
    WHERE {
        ?report sh:result ?result .
        ?result sh:focusNode ?focusNode .
    }
    GROUP BY ?focusNode
    ORDER BY DESC(?count)
    """
    results = graph.query(queryFocusNodeDistribution)

    # added str() to JSON serialize result
    return [
    {
        "key": str(row[0]),
        "value": str(row[1].value)
    }

    for row in results
    ]


def queryResultPathDistributionFunction(graph):
    queryResultPathDistribution = """
    SELECT ?resultPath (COUNT(*) as ?count)
    WHERE {
        ?report sh:result ?result .
        ?result sh:resultPath ?resultPath .
    }
    GROUP BY ?resultPath
    ORDER BY DESC(?count)
    """
    results = graph.query(queryResultPathDistribution)

    #added str() to JSON serialize result
    return [
    {
        "key": str(row[0]),
        "value": str(row[1].value)
    }

    for row in results
    ]


def resultSeverityDistribution(graph):
    queryResultSeverityDistribution = """
    SELECT ?resultSeverity (COUNT(*) as ?count)
    WHERE {
        ?report sh:result ?result .
        ?result sh:resultSeverity ?resultSeverity .
    }
    GROUP BY ?resultSeverity
    """
    results = graph.query(queryResultSeverityDistribution)


def resultSourceConstraintComponentDistribution(graph):
    queryResultSourceConstraintComponentDistribution = """
    SELECT ?sourceConstraintComponent (COUNT(*) as ?count)
    WHERE {
        ?report sh:result ?result .
        ?result sh:sourceConstraintComponent ?sourceConstraintComponent .
    }
    GROUP BY ?sourceConstraintComponent
    """
    results = graph.query(queryResultSourceConstraintComponentDistribution)

    #added string to JSON serialize result
    return [
    {
        "key": str(row[0]),
        "value": str(row[1].value)
    }

    for row in results
    ]


#extract the sparql result, bc Object of type SPARQLResult is not JSON serializable
def extract_sparql_result(sparql_result):
    return [str(row[0]) for row in sparql_result] if sparql_result else None

def analyze_graph(graph):
    total_violations = extract_sparql_result(graph.query(queryGesamtzahlViolations))
    total_violating_nodes = extract_sparql_result(graph.query(queryAnzahlViolatingNodes))
    total_violating_resultPaths = extract_sparql_result(graph.query(queryAnzahlViolatingResultPaths))
    most_frequent_violation_type = extract_sparql_result(graph.query(queryMostFrequentViolationType))
    most_violating_node = extract_sparql_result(graph.query(queryMostViolatingNode))
    most_frequent_result_path = extract_sparql_result(graph.query(queryMostFrequenResultPath))


    analysis_result = {
        "total_violations": total_violations,
        "total_violating_nodes": total_violating_nodes,
        "total_violating_resultPaths": total_violating_resultPaths, 
        "most_frequent_violation_type": prefixEntfernenEinzeln(str(most_frequent_violation_type), graph),
        "most_violating_node": str(prefixEntfernenEinzeln(most_violating_node, graph)),
        "violationTypes_occurance" : prefixEntfernenMehrere(resultSourceConstraintComponentDistribution(graph), graph),
        "focusNode_violations" : prefixEntfernenMehrere(queryFocusNodeDistributionFunction(graph), graph),
        "most_frequent_resultPath" : str(prefixEntfernenEinzeln(most_frequent_result_path, graph)),
        "result_path_occurance": prefixEntfernenMehrere(queryResultPathDistributionFunction(graph), graph)
    }
    return analysis_result



def prefixEntfernenEinzeln(eingabe, g):
    eingabe = str(eingabe)
    namespaces = {str(ns): prefix for prefix, ns in g.namespaces()}
    for a,b in namespaces.items():
        if eingabe.startswith("['" + a) or eingabe.startswith(a):
            listePrefixe.append(a)
            cut_off_input = eingabe.replace(a, "")
            prefix_dict[cut_off_input] = a #save prefix in dict
            return cut_off_input
    return eingabe

def prefixEntfernenMehrere(eingabe, g):
    for a in eingabe:
        a['key'] = prefixEntfernenEinzeln(a['key'], g)
    return eingabe

#to access prefix_dict from another file
def get_prefix_dict():
    return prefix_dict