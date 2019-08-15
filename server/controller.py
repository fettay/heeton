from flask import jsonify

def process_request(request):
    content = request.get_json()
    print(content)
    return jsonify({'words': ['ביבי']})