# TODO: implement parser function

from rdflib import Graph, URIRef
from rdflib.plugins.sparql.processor import prepareQuery


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

queryMostFrequentViolationType = """
SELECT ?sourceConstraintComponent 
WHERE {
    ?report sh:result ?result .
    ?result sh:sourceConstraintComponent ?sourceConstraintComponent .
}
GROUP BY ?focusNode
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
SELECT ?focusNode (COUNT(*) AS ?count)
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

    # Alissa: added str() to JSON serialize result
    return [
    {
        "key": str(row[0]),
        "value": str(row[1].value)
    }

    for row in results
    ]

def queryResultPathDistributionFunction(graph):
    queryFocusNodeDistribution = """
    SELECT ?focusNode (COUNT(*) as ?count)
    WHERE {
        ?report sh:result ?result .
        ?result sh:resultPath ?resultPath .
    }
    GROUP BY ?resultPath
    ORDER BY DESC(?count)
    """
    results = graph.query(queryFocusNodeDistribution)

    # Alissa: added str() to JSON serialize result
    return [
    {
        "key": str(row[0]),
        "value": str(row[1].value)
    }

    for row in results
    ]







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






    # Alissa: added string to JSON serialize result
    return [
    {
        "key": str(row[0]),
        "value": str(row[1].value)
    }

    for row in results
    ]


   

    

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


# Alissa: extract the sparql result, bc Object of type SPARQLResult is not JSON serializable
def extract_sparql_result(sparql_result):
    # Falls SPARQLResult ein iterierbares Objekt ist
    return [str(row[0]) for row in sparql_result] if sparql_result else None

# Alissa: added extract_sparql_result
def analyze_graph(graph):
    print("hallo")
    # Example analysis: Count the number of triples in the graph
    total_violations = extract_sparql_result(graph.query(queryGesamtzahlViolations))
    total_violating_nodes = extract_sparql_result(graph.query(queryAnzahlViolatingNodes))
    triple_count = len(graph)
    most_frequent_violation_type = extract_sparql_result(graph.query(queryMostFrequentViolationType))
    most_violating_node = extract_sparql_result(graph.query(queryMostViolatingNode))
    most_frequent_result_path = extract_sparql_result(graph.query(queryMostFrequenResultPath))
    #focusNode_Distribution = graph.query(queryFocusNodeDistribution)
    resultPath_Distribution = graph.query(queryResultPathDistribution)
    sourceConstraintComponent_Distribution = graph.query(querySourceConstraintComponentDistribution)
    #resultSeverity_Distribution = graph.query(queryResultSeverityDistribution)
    querySourceShape_Distribution = graph.query(querySourceShapeDistribution)
    

        
    # DEBUG
 #   print(f"{RED}FOCUSNODE_DISTRIBUTION: {focusNode_Distribution}{RESET}")
   # print(f"{GREEN}JSON(FOCUSNODE_DISTRIBUTION): {sparqlToDict(focusNode_Distribution)}{RESET}")

   # print(f"{GREEN}JSON(RESULTSEVERITY_DISTRIBUTION): {sparqlToDict(resultSeverity_Distribution)}{RESET}")


    analysis_result = {
        "total_violations": total_violations,
        "total_violating_nodes": total_violating_nodes,
        "most_frequent_violation_type": prefixEntfernenEinzeln(str(most_frequent_violation_type), graph),
        "most_violating_node": str(prefixEntfernenEinzeln(most_violating_node, graph)),
        "violationTypes_occurance" : prefixEntfernenMehrere(resultSourceConstraintComponentDistribution(graph), graph),
        "focusNode_violations" : prefixEntfernenMehrere(queryFocusNodeDistributionFunction(graph), graph),
        "most_frequent_resultPath" : str(prefixEntfernenEinzeln(most_frequent_result_path, graph)),
        "result_path_occurance": prefixEntfernenMehrere(queryResultPathDistributionFunction(graph), graph)
    }
        #violationTypes_occurance: resultSeverity_Distribution.list, 
        # Add more analysis results as needed     
        #TODO: can't be send to frontend -> need to extract information from SPARQL-result / dictionary
        #"focusNode_Distribution": sparqlToDict(focusNode_Distribution)
        #"resultPath_Distribution": resultPath_Distribution,
        #"sourceConstraintComponent_Distribution": sourceConstraintComponent_Distribution,
        #"resultSeverity_Distribution": resultSeverity_Distribution,
        #"sourceShape_Distribution" : querySourceShape_Distribution
    
    
    return analysis_result


def filterNode(graph, node):
    print("nodeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: " + str(node))
    queryFilterNode = f"""
    CONSTRUCT {{
    ?result a sh:ValidationResult ;
        sh:focusNode <{node}> ;
        sh:resultPath ?resultPath ;
        sh:resultSeverity ?resultSeverity ;
        sh:sourceConstraintComponent ?sourceConstraintComponent ;
        sh:sourceShape ?sourceShape ;
        sh:resultMessage ?resultMessage .
}}
WHERE {{
    ?report sh:result ?result .
    ?result sh:focusNode <{node}> ;
        sh:resultPath ?resultPath ;
        sh:resultSeverity ?resultSeverity ;
        sh:sourceConstraintComponent ?sourceConstraintComponent ;
        sh:sourceShape ?sourceShape ;
        sh:resultMessage ?resultMessage .
}}
    """
    return graph.query(queryFilterNode).graph


def filterResultPath(graph, path):
    queryFilterResultPath = f"""
    SELECT ?focusNode ?resultPath ?resultSeverity ?sourceConstraintComponent ?sourceShape ?resultMessage
    WHERE {{
    ?report sh:result ?result .
    ?result sh:resultPath <{path}> ;
        sh:focusNode ?focusNode ;
        sh:resultPath ?resultPath ;
        sh:resultSeverity ?resultSeverity ;
        sh:sourceConstraintComponent ?sourceConstraintComponent ;
        sh:sourceShape ?sourceShape ;
        sh:resultMessage ?resultMessage .
    }}
    """
    return graph.query(queryFilterResultPath)

def filterSeverity(graph, severity):
    queryFilterSeverity = f"""
    SELECT ?focusNode ?resultPath ?resultSeverity ?sourceConstraintComponent ?sourceShape ?resultMessage
    WHERE {{
    ?report sh:result ?result .
    ?result sh:resultSeverity <{severity}> ;
        sh:focusNode ?focusNode ;
        sh:resultPath ?resultPath ;
        sh:resultSeverity ?resultSeverity ;
        sh:sourceConstraintComponent ?sourceConstraintComponent ;
        sh:sourceShape ?sourceShape ;
        sh:resultMessage ?resultMessage .
    }}
    """
    return graph.query(queryFilterSeverity)


def filterSourceConstraintComponent(graph, component):
    queryFilterSourceConstraintComponent = f"""
    SELECT ?focusNode ?resultPath ?resultSeverity ?sourceConstraintComponent ?sourceShape ?resultMessage
    WHERE {{
    ?report sh:result ?result .
    ?result sh:sourceConstraintComponent <{component}> ;
        sh:focusNode ?focusNode ;
        sh:resultPath ?resultPath ;
        sh:resultSeverity ?resultSeverity ;
        sh:sourceConstraintComponent ?sourceConstraintComponent ;
        sh:sourceShape ?sourceShape ;
        sh:resultMessage ?resultMessage .
    }}
    """
    return graph.query(queryFilterSourceConstraintComponent)

def filterSourceShape(graph, sourceShape):
    queryFilterSourceShape = f"""
    SELECT ?focusNode ?resultPath ?resultSeverity ?sourceConstraintComponent ?sourceShape ?resultMessage
    WHERE {{
    ?report sh:result ?result .
    ?result sh:sourceConstraintComponent <{sourceShape}> ;
        sh:focusNode ?focusNode ;
        sh:resultPath ?resultPath ;
        sh:resultSeverity ?resultSeverity ;
        sh:sourceConstraintComponent ?sourceConstraintComponent ;
        sh:sourceShape ?sourceShape ;
        sh:resultMessage ?resultMessage .
    }}
    """
    return graph.query(queryFilterSourceShape)
    
def filterResultMessage(graph, message):
    queryFilterResultMessage = f"""
    SELECT ?focusNode ?resultPath ?resultSeverity ?sourceConstraintComponent ?sourceShape ?resultMessage
    WHERE {{
    ?report sh:result ?result .
    ?result sh:sourceConstraintComponent <{message}> ;
        sh:focusNode ?focusNode ;
        sh:resultPath ?resultPath ;
        sh:resultSeverity ?resultSeverity ;
        sh:sourceConstraintComponent ?sourceConstraintComponent ;
        sh:sourceShape ?sourceShape ;
        sh:resultMessage ?resultMessage .
    }}
    """
    return graph.query(queryFilterResultMessage)


def prefixEntfernenEinzeln(eingabe, g):
    eingabe = str(eingabe)
    namespaces = {str(ns): prefix for prefix, ns in g.namespaces()}
    for a,b in namespaces.items():
        if eingabe.startswith("['" + a) or eingabe.startswith(a):
            return eingabe.replace(a, "")
    return eingabe

def prefixEntfernenMehrere(eingabe, g):
    for a in eingabe:
        a['key'] = prefixEntfernenEinzeln(a['key'], g)
    return eingabe





g = Graph()
g.parse("backend/validation_report1.ttl", format="turtle")

print(analyze_graph(g))






#results = g.query(querySourceShapeDistribution)

#result = filterNode(g, URIRef("http://www.Department5.University0.edu/FullProfessor7"))
