# TODO: implement parser function

from rdflib import Graph
import os
from flask import jsonify


RED = "\033[31m"
GREEN = "\033[32m"
YELLOW = "\033[33m"
RESET = "\033[0m"


"""
Lass uns jede Zeile erklären:

?report sh:result ?result .
PREFIX ex: <http://example.org/>
PREFIX sh: <http://www.w3.org/ns/shacl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?resultPath ?message
WHERE {
    ?report sh:result ?result .        # 1
    ?result sh:focusNode ex:node2 ;    # 2
            sh:resultPath ?resultPath ; # 3
            sh:resultMessage ?message . # 4
}

Sucht nach einem Tripel, wo irgendein Subjekt (?report)
über das Prädikat sh:result
mit einem Objekt (?result) verbunden ist
In Ihrer Datei ist dies der ex:Report Knoten


?result sh:focusNode ex:node2 ;

Nutzt das gefundene ?result von oben
Sucht darin nach dem sh:focusNode mit dem Wert ex:node2
Das Semikolon (;) bedeutet: weiteres Prädikat folgt für das gleiche Subjekt


sh:resultPath ?resultPath ;

Für das gleiche ?result
Holt den Wert von sh:resultPath
Speichert ihn in der Variable ?resultPath
In Ihrem Fall wird dies ex:propertyB sein


sh:resultMessage ?message .

Für das gleiche ?result
Holt den Wert von sh:resultMessage
Speichert ihn in der Variable ?message
In Ihrem Fall die Fehlermeldung über zu viele Werte
"""

#g = Graph()
#g.parse("backend/shaclBeispiel.ttl", format="turtle")

queryGesamtzahlViolations = """
SELECT (COUNT(?result) as ?c)
WHERE {
    ?report sh:result ?result .
}
"""
queryFocusNodeDistribution = """
SELECT ?focusNode (COUNT(*) as ?count)
WHERE {
    ?report sh:result ?result .
    ?result sh:focusNode ?focusNode .
}
GROUP BY ?focusNode
"""
queryResultPathDistribution = """
SELECT ?resultPath (COUNT(*) as ?count)
WHERE {
    ?report sh:result ?result .
    ?result sh:resultPath ?resultPath .
}
GROUP BY ?resultPath

"""
querySourceConstraintComponentDistribution = """
SELECT ?sourceConstraintComponent (COUNT(*) as ?count)
WHERE {
    ?report sh:result ?result .
    ?result sh:sourceConstraintComponent ?sourceConstraintComponent .
}
GROUP BY ?sourceConstraintComponent
"""
queryResultSeverityDistribution = """
SELECT ?resultSeverity (COUNT(*) as ?count)
WHERE {
    ?report sh:result ?result .
    ?result sh:resultSeverity ?resultSeverity .
}
GROUP BY ?resultSeverity
"""
querySourceShapeDistribution = """
SELECT ?sourceShape (COUNT(*) as ?count)
WHERE {
    ?report sh:result ?result .
    ?result sh:sourceShape ?sourceShape .
}
GROUP BY ?sourceShape
"""


# Convert SPARQLResult to a list of dictionaries
def sparqlToDict(sparql_result):
    result_list = []
    for row in sparql_result:
        # Use sparql_result.vars to get the variable names
        row_dict = {str(var): str(row[var]) for var in sparql_result.vars if row[var] is not None}
        result_list.append(row_dict)
    
    return result_list  # Return as a JSON-compatible list of dictionaries


def analyze_graph(graph):
    # Example analysis: Count the number of triples in the graph
    triple_count = len(graph)
    focusNode_Distribution = graph.query(queryFocusNodeDistribution)
    resultPath_Distribution = graph.query(queryResultPathDistribution)
    sourceConstraintComponent_Distribution = graph.query(querySourceConstraintComponentDistribution)
    resultSeverity_Distribution = graph.query(queryResultSeverityDistribution)
    querySourceShape_Distribution = graph.query(querySourceShapeDistribution)
        
    # DEBUG
    print(f"{RED}FOCUSNODE_DISTRIBUTION: {focusNode_Distribution}{RESET}")
    print(f"{GREEN}JSON(FOCUSNODE_DISTRIBUTION): {sparqlToDict(focusNode_Distribution)}{RESET}")

    analysis_result = {
        "triple_count": triple_count,
        # Add more analysis results as needed
        
        #TODO: can't be send to frontend -> need to extract information from SPARQL-result / dictionary
        "focusNode_Distribution": sparqlToDict(focusNode_Distribution)
        #"resultPath_Distribution": resultPath_Distribution,
        #"sourceConstraintComponent_Distribution": sourceConstraintComponent_Distribution,
        #"resultSeverity_Distribution": resultSeverity_Distribution,
        #"sourceShape_Distribution" : querySourceShape_Distribution
    }
    
    return analysis_result

#results = g.query(querySourceShapeDistribution)


#for a in list(results):
#    print(f"{a[0]} {a[1]}")
