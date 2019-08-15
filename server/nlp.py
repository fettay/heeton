import numpy as np
import pandas as pd
import hebrew_tokenizer as tok

df_freq = pd.read_csv('stopwords.csv')
df_freq.columns = ['freq', 'pointer', 'word', 'pos']
df_freq = df_freq[['word', 'pos', 'freq', 'pointer']]

def score_word(word):
    freq = df.loc[df.word == word, 'freq']
    if len(freq) == 0:
        return -1
    else:
        return 1 / np.log(freq.iloc[0])**2
        
def get_hardwords(text):
    toks = list(tok.tokenize(text))
    res = [(tok[1], score_word(tok[1])) for tok in toks]
    return [r[0] for r in res if r[1] > 0.05]
    
    
