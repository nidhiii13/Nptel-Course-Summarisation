import pickle
#model=pickle.load(open(r"C:\Users\nidhi\Nptel-Course-Summarisation\backend\QG-Model\QG.pkl",'rb+'))
from .pipelines import pipeline


def ques_generator(text):
    nlp = pipeline("e2e-qg", model="valhalla/t5-base-e2e-qg")
    ques = nlp(text)
    return ques