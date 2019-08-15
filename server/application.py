from flask import Flask, request
from controller import process_request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello World!"


@app.route("/api", methods=["POST"])
def filter_words():
    return process_request(request)