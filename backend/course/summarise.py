import pickle
model=pickle.load(open(r"C:\Users\nidhi\Nptel-Course-Summarisation\backend\Summarisation-Model\Summariser.pkl",'rb+'))

def summarise_text(text):
    article_summary = model(text, max_length=1300, min_length=100, do_sample=False)
    return article_summary