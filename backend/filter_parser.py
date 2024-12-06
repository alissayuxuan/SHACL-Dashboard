"""
fn_queryGesamtzahlViolations = 
    SELECT (COUNT(?result) as ?c)
    WHERE {
        ?report sh:result ?result .
        ?result sh:focusNode <{node}> .

}"""

def filterNode(graph, input):
    return

  #  fn_total_violations = extract_sparql_result(graph.query(fn_queryGesamtzahlViolations))


def filterResultPath(graph, input):
    return
    
def filterSeverity(graph, input):
    return

def filterSourceConstraintComponent(graph, input):
    return

def filterNode(graph, input):
    return