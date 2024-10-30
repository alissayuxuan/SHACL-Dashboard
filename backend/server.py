#import time
from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # CORS aktivieren

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3", "Member4"]}

if __name__ == "__main__":
    app.run(debug=True)
