from flask import jsonify, make_response
from nlp import get_hardwords


def process_request(request):
    content = request.get_json()
    hardwords = get_hardwords(content['text'])
    response = make_response(jsonify({'hardwords': hardwords}))
    return response
