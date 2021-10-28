import random
import json
import torch
from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('intents.json', 'r') as f:
    intents = json.load(f)
# opening our safe files
FILE = "data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data["all_words"]
tags = data["tags"]
model_state = data["model_state"]


model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

# bot_name = "Frida"
# print("Let's chat! type 'quit' to exit")
# while True:
#     sentence = input('You: ')
#     if sentence == "quit":
#         break
#     # tokenizing our sentence
#     sentence = tokenize(sentence)
#     # creating the bag of words
#     X = bag_of_words(sentence, all_words)
#     # reshaping
#     X = X.reshape(1, X.shape[0])
#     X = torch.from_numpy(X)
#
#     output = model(X)
#     _, predicted = torch.max(output, dim=1)
#     tag = tags[predicted.item()]
#     # checking the probability
#     probs = torch.softmax(output, dim=1)
#     prob = probs[0][predicted.item()]
#
#     if prob.item() > 0.75:
#         for intent in intents["intents"]:
#             if tag == intent["tag"]:
#                 print(f"{bot_name}: {random.choice(intent['responses'])}")
#     else:
#         print(f"{bot_name}: I do not understand...")


def get_response(text):
     # text = input('You: ')
    # if  text == "quit":
    #     break
    # # tokenizing our sentence
    text = tokenize(text)
    # creating the bag of words
    y = bag_of_words(text, all_words)
    # reshaping
    y = y.reshape(1, y.shape[0])
    y = torch.from_numpy(y)

    outputt = model(y)
    _, predictedd = torch.max(outputt, dim=1)
    tag = tags[predictedd.item()]
    # checking the probability
    probss = torch.softmax(outputt, dim=1)
    probb = probss[0][predictedd.item()]

    if probb.item() > 0.75:
        for intentt in intents["intents"]:
            if tag == intentt["tag"]:
                return random.choice(intentt['responses'])
    else:
        return 'I do not understand...'

