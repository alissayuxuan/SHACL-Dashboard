from graph_parser import extract_sparql_result, prefixEntfernenEinzeln, prefixEntfernenMehrere, getNamespaces


#Hilfsfunktionen für Filter Node: 

def fn_sourceConstraintComponentDistribution(graph, input):
    queryResultSourceConstraintComponentDistribution = f"""
    SELECT ?sourceConstraintComponent (COUNT(*) as ?count)
    WHERE {{
        ?report sh:result ?result .
        ?result sh:focusNode <{input}> .
        ?result sh:sourceConstraintComponent ?sourceConstraintComponent .

    }}
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


#Hilfsfunktionen für Filter ResultPath: 

def frp_sourceConstraintComponentDistribution(graph, input):
    queryResultSourceConstraintComponentDistribution = f"""
    SELECT ?sourceConstraintComponent (COUNT(*) as ?count)
    WHERE {{
        ?report sh:result ?result .
        ?result sh:resultPath <{input}> .
        ?result sh:sourceConstraintComponent ?sourceConstraintComponent .

    }}
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



#Hilfsfunktionen für Filter Violation Typ: 
def fscc_focusNodeDistributionFunction(graph, input):
    queryFocusNodeDistribution = f"""
    SELECT ?focusNode (COUNT(*) as ?count)
    WHERE {{
        ?report sh:result ?result .
        ?result sh:focusNode ?focusNode .
        ?result sh:sourceConstraintComponent <{input}> .
    }}
    GROUP BY ?focusNode
    ORDER BY DESC(?count)
    """
    results = graph.query(queryFocusNodeDistribution)

    return [
    {
        "key": str(row[0]),
        "value": str(row[1].value)
    }

    for row in results
    ]

def fscc_resultPathDistributionFunction(graph, input):
    queryResultPathDistribution = f"""
    SELECT ?resultPath (COUNT(*) as ?count)
    WHERE {{
        ?report sh:result ?result .
        ?result sh:resultPath ?resultPath .
        ?result sh:sourceConstraintComponent <{input}> .
    }}
    GROUP BY ?resultPath
    ORDER BY DESC(?count)
    """
    results = graph.query(queryResultPathDistribution)

    return [
    {
        "key": str(row[0]),
        "value": str(row[1].value)
    }

    for row in results
    ]

    







def filterNode(graph, input):
    fn_queryGesamtzahlViolations = f"""
    SELECT (COUNT(?result) as ?c)
    WHERE {{
        ?report sh:result ?result .
        ?result sh:focusNode <{input}> .
        }}
    """
    fn_queryMostFrequentViolationtype = f"""
    SELECT ?sourceConstraintComponent (COUNT(*) AS ?count)
    WHERE {{
        ?report sh:result ?result .
        ?result sh:focusNode <{input}> .
        ?result sh:sourceConstraintComponent ?sourceConstraintComponent .
    }}
    GROUP BY ?sourceConstraintComponent
    ORDER BY DESC(?count)
    LIMIT 1 
    """
    return {
        "total_violations": extract_sparql_result(graph.query(fn_queryGesamtzahlViolations)), 
        "most_frequent_violation_type": prefixEntfernenEinzeln(str(extract_sparql_result(graph.query(fn_queryMostFrequentViolationtype))), graph),
        "violationTypes_occurance": prefixEntfernenMehrere(fn_sourceConstraintComponentDistribution(graph, input), graph)
    }

        








def filterResultPath(graph, input):
    namespaces = getNamespaces(graph)

    for n in namespaces: 
        inputNeu = n + input

        
        frp_queryGesamtzahlViolations = f"""
        SELECT (COUNT(?result) as ?c)
        WHERE {{
            ?report sh:result ?result .
            ?result sh:resultPath <{inputNeu}> .
            }}
        """

        a = extract_sparql_result(graph.query(frp_queryGesamtzahlViolations))
        if a == ['0']:
            print()
        else:
            break



    frp_queryGesamtzahlViolations = f"""
    SELECT (COUNT(?result) as ?c)
    WHERE {{
        ?report sh:result ?result .
        ?result sh:resultPath <{inputNeu}> .
        }}
    """

    frp_queryMostFrequentViolationtype = f"""
    SELECT ?sourceConstraintComponent (COUNT(*) AS ?count)
    WHERE {{
        ?report sh:result ?result .
        ?result sh:resultPath <{inputNeu}> .
        ?result sh:sourceConstraintComponent ?sourceConstraintComponent .
    }}
    GROUP BY ?sourceConstraintComponent
    ORDER BY DESC(?count)
    LIMIT 1 
"""
    return {
        "total_violations": extract_sparql_result(graph.query(frp_queryGesamtzahlViolations)), 
        "most_frequent_violation_type": prefixEntfernenEinzeln(str(extract_sparql_result(graph.query(frp_queryMostFrequentViolationtype))), graph),
        "violationTypes_occurance": prefixEntfernenMehrere(frp_sourceConstraintComponentDistribution(graph, inputNeu), graph),
    }
    


def filterSourceConstraintComponent(graph, input):
    namespaces = getNamespaces(graph)

    for n in namespaces: 
        inputNeu = n + input

        fscc_queryGesamtzahlViolations = f"""
        SELECT (COUNT(?result) as ?c)
        WHERE {{
            ?report sh:result ?result .
            ?result sh:sourceConstraintComponent <{inputNeu}> .
            }}
        """

        a = extract_sparql_result(graph.query(fscc_queryGesamtzahlViolations))
        if a == ['0']:
            print()
        else:
            break



    fscc_queryGesamtzahlViolations = f"""
    SELECT (COUNT(?result) as ?c)
    WHERE {{
        ?report sh:result ?result .
        ?result sh:sourceConstraintComponent <{inputNeu}> .
        }}
    """



    fscc_queryNumberViolatedNodes = f"""
SELECT (COUNT(DISTINCT ?focusNode) as ?c)
WHERE {{
    ?report sh:result ?result .
    ?result sh:focusNode ?focusNode .
    ?result sh:sourceConstraintComponent <{inputNeu}> .
    }}
"""
    fscc_queryNumberViolatedResultPaths = f"""
SELECT (COUNT(DISTINCT ?resultPath) as ?c)
WHERE {{
    ?report sh:result ?result .
    ?result sh:resultPath ?resultPath .
    ?result sh:sourceConstraintComponent <{inputNeu}> .
    }}
"""
    fscc_queryMostViolatingNode = f"""
SELECT ?focusNode (COUNT(*) AS ?count)
WHERE {{
  ?report sh:result ?result .
  ?result sh:focusNode ?focusNode .
  ?result sh:sourceConstraintComponent <{inputNeu}> .
}}
GROUP BY ?focusNode
ORDER BY DESC(?count)
LIMIT 1 
"""
    
    fscc_queryMostViolatingResultPath = f"""
SELECT ?resultPath (COUNT(*) AS ?count)
WHERE {{
  ?report sh:result ?result .
  ?result sh:resultPath ?resultPath .
  ?result sh:sourceConstraintComponent <{inputNeu}> .
}}
GROUP BY ?resultPath
ORDER BY DESC(?count)
LIMIT 1 
"""
    
    return{
        "total_violations": extract_sparql_result(graph.query(fscc_queryGesamtzahlViolations)), 
        "most_violating_node": str(prefixEntfernenEinzeln(str(extract_sparql_result(graph.query(fscc_queryMostViolatingNode))), graph)),
        "most_frequent_resultPath" : str(prefixEntfernenEinzeln(str(extract_sparql_result(graph.query(fscc_queryMostViolatingResultPath))), graph)),
        "focusNode_violations" : prefixEntfernenMehrere(fscc_focusNodeDistributionFunction(graph, inputNeu), graph),
        "result_path_occurance": prefixEntfernenMehrere(fscc_resultPathDistributionFunction(graph, inputNeu), graph),
        "total_focusNodes": extract_sparql_result(graph.query(fscc_queryNumberViolatedNodes)),
        "total_resultPaths": extract_sparql_result(graph.query(fscc_queryNumberViolatedResultPaths))
    }

