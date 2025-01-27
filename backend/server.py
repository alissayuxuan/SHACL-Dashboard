from flask import Flask, request, session
from flask_cors import CORS
from rdflib import Graph

from uploadFile import upload_file, get_result
from filterFile import filter
from search_parser import search

app = Flask(__name__)
CORS(app) 

graph = Graph()

@app.route("/")
def home():
    return {"status": "Server is running!"}

@app.route('/upload', methods=['POST'])
def handle_upload(): 
    file = request.files['file']
    global graph
    graph = Graph()
    try: 
       graph.parse(file, format='turtle') 
    except:
        try:
            file.seek(0)
            graph.parse(file,format='xml')
        except:
            print("error parsing file")
            
    return upload_file(graph)# Call the function from uploadFile.py

@app.route('/result', methods=['GET'])
def handle_result():
    return get_result()  # Call the function to get the analysis result

@app.route('/filter', methods=['POST'])
def handle_filter():  
    category = request.form.get('category')
    input = request.form.get('input')
    return filter(graph, category, input)

@app.route('/search', methods=['POST'])
def handle_search():
    violation_type = request.form.get('violationType')
    focus_node = request.form.get('focusNode')
    result_path = request.form.get('resultPath')
    return search(graph, violation_type, focus_node, result_path)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")