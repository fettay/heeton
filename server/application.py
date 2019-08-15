from flask import Flask, request
from controller import process_request
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"


@app.route("/api", methods=["POST"])
def filter_words():
    return process_request(request)