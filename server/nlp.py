import numpy as np
import pandas as pd
import pickle
from googletrans import Translator
translator = Translator()

import spacy
nlp = spacy.load("en_core_web_md")

with open('dic_words.bin', 'rb') as handle:
    dic_words = pickle.load(handle)

# with open("model_article_classif/model.bin", "rb") as f:
#     model = pickle.loads(f.read())

# diff_taxo = {10: 0, 11: .2, 12: .9, 13: 1, 14: .3, 15: .7, 16: .4, 1700: .5, 1702: .5, 1703: .4, 1704: .6,  1705: .7,
#              1706: .7, 1707: .8, 1708: .9, 1709: .7, 1710: .6, 1711: .6, 18: .4, 19: .2, 20: .8, 21: .3, 22: .3}

def trad(word, dest='en'):
    return translator.translate(word, dest=dest).text


def score_word(word):
    freq = dic_words.get(word)
    return 1 / np.log(freq)**2 if freq else -1


def get_hardwords(text ,lemma=False):
    res = [(word, score_word(word)) for word in text.split()]
    res.sort(key=lambda x: x[1], reverse=True)
    hardwords = set([x[0] for x in res if x[1] > .04])
    return [(w, trad(w)) for w in hardwords if len(w) > 3]


def get_entities(text):
    doc = nlp(trad(text))
    ents = set([(X.text, trad(X.text, 'he'), X.label_) for X in doc.ents 
                if X.label_ not in ['DATE', 'CARDINAL', 'ORDINAL']])
    return {ent[1]: (ent[0], ent[2]) for ent in ents}


def get_diff_topic(text):
    pred = model.predict([trad(text)])[0]
    pred = pred if pred // 100 == 17 else pred // 100
    return diff_taxo[pred]


# def get_score_to_letter(score):
#     if score < .3:
#         return 'aleph'
#     elif score < .6:
#         return 'beth'
#     elif score < .8:
#         return 'guimel'
#     else:
#         return 'daleth'
    
    
# def get_score_article(text, hardwords=None):
#     hardwords = hardwords if hardwords else get_hardwords(text)
#     topic_factor = get_diff_topic(text)
#     len_factor = len(text.split()) / 4000
#     diff_factor = len(hardwords) * 20 / len(text.split())
#     score = (topic_factor + len_factor + diff_factor) / 3
#     return get_score_to_letter(score)
