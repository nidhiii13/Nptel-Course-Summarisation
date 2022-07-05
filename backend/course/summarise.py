import pickle
model=pickle.load(open(r"C:\Users\nidhi\Nptel-Course-Summarisation\backend\Summarisation-Model\Summariser.pkl",'rb+'))

def summarise_text(text):
    article_summary = model(text, max_length=1500, min_length=180, do_sample=False,truncation = True)
    return article_summary