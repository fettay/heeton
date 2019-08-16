from flask import Flask, request
from controller import process_request
from flask_cors import CORS
import requests
import json


app = Flask(__name__)
CORS(app)



@app.route("/")
def hello():
    return "Hello World!"


@app.route("/api", methods=["POST"])
def filter_words():
    response = process_request(request)


def get_wiki_url(query):
  response = requests.get('https://en.wikipedia.org/w/api.php?action=opensearch&search='+query+'&limit=1&namespace=0 &format=json')
  t = json.loads(response.text)
  if len(t) > 0:
      if len(t[-1]) > 0:
          return t[-1][0]
  return None