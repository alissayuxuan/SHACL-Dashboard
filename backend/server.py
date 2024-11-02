#import time
from flask import Flask
from flask_cors import CORS
from uploadFile import upload_file


app = Flask(__name__)
CORS(app)  # CORS aktivieren

@app.route("/")
def home():
    return {"person": ["Person1", "Person2"]}

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3", "Member4"]}

@app.route('/upload', methods=['POST'])
def handle_upload():  # Renamed to avoid confusion with the imported function
    return upload_file()  # Call the function from uploadFile.py

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
