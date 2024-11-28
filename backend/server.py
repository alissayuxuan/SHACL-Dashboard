from flask import Flask, request, session
from flask_cors import CORS
from rdflib import Graph


from uploadFile import upload_file, get_result
from filterFile import filter


app = Flask(__name__)
CORS(app)  # CORS aktivieren


graph = Graph()




@app.route("/")
def home():
    return {"status": "Server is running!"}

@app.route('/upload', methods=['POST'])
def handle_upload(): 
    file = request.files['file']
    global graph
    graph.parse(file, format='turtle')
    
   ## if not file.filename.endswith('.ttl'):
     #   print("leider ja")
    #else:
     #   print("sehr gut")    
    return upload_file(graph)  # Call the function from uploadFile.py

@app.route('/result', methods=['GET'])
def handle_result():
    return get_result()  # Call the function to get the analysis result

@app.route('/filter', methods=['POST'])
def handle_filter():
    category = request.form.get('category')
    input = request.form.get('input')
    return filter(graph, category, input)
    



if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")


