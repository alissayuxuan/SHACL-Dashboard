from flask import Flask
from flask_cors import CORS

from uploadFile import upload_file, get_result


app = Flask(__name__)
CORS(app)  # CORS aktivieren

@app.route("/")
def home():
    return {"status": "Server is running!"}

@app.route('/upload', methods=['POST'])
def handle_upload(): 
    return upload_file()  # Call the function from uploadFile.py

@app.route('/result', methods=['GET'])
def handle_result():
    return get_result()  # Call the function to get the analysis result

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
