from flask import jsonify, make_response
from nlp import get_hardwords, get_entities, get_diff_topic


def process_request(request):
    content = request.get_json()
    hardwords = get_hardwords(content['text'])
    entities = get_entities(content['text'])
    score = get_score_article(content['text'])
    response = make_response(jsonify({'hardwords': hardwords, 'entities': entities, 'score': score}))
    print(response)
    return response
