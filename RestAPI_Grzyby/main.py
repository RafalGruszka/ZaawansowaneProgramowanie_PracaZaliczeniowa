# Praca zaliczeniowa z przedmiotu "Zaawansowane programowanie"

# pip install "uvicorn[standard]" - instalacja serwera
# uvicorn main:app --reload - uruchomienie serwera
# http://127.0.0.1:8000/docs - dokumentacja usługi REST API

# version 0.2 - Added ML classification model with sklearn and mushroom dataset
# version 0.3 - Added CORS middleware to allow requests from localhost:3000
# version 0.4 - Added get-data endpoint to get all possible values for each column
# version 0.5 - Switched example classification data with data included in request body
# version 0.6 - Added get-explanation endpoint to get decision tree explanation as png file

from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.responses import FileResponse
from pydantic import BaseModel
from sklearn import tree
import pandas as pd
import matplotlib.pyplot as plt

# import danych do budowy modelu
dataset = pd.read_csv('Data//GRZYBY_dataset.csv')
#print(dataset.head())

# Budowa modelu
model = tree.DecisionTreeClassifier()
#print(dataset.size)

# Trenowanie modelu
y = dataset['rodzaj']
x = dataset.iloc[:,1:23]

y_conv = pd.get_dummies(dataset['rodzaj'])
x_conv = pd.get_dummies(dataset.iloc[:,1:23])
#print(pd.get_dummies(dataset.iloc[0:1,1:23]))
model.fit(x_conv, y)
#print(model.score(x, y))

#print(model.predict(pd.get_dummies(dataset.iloc[0:1,1:23])))

# Rest API

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


class Response(BaseModel):
    rodzaj: str
    prawdopodobienstwo: float

class Mushroom(BaseModel):
    ksztalt_kapelusza: Union[str, None] = None
    powierzchnia_kapelusza: Union[str, None] = None
    kolor_kapelusza: Union[str, None] = None
    zasinienia: Union[str, None] = None
    zapach: Union[str, None] = None
    sposob_przyrastania_blaszek: Union[str, None] = None
    odstep_miedzy_blaszkami: Union[str, None] = None
    rozmiar_blaszek: Union[str, None] = None
    kolor_blaszek: Union[str, None] = None
    ksztalt_trzonu: Union[str, None] = None
    korzen_trzonu: Union[str, None] = None
    powierzchnia_trzonu_nad_pierscieniem: Union[str, None] = None
    powierzchnia_lodygi_ponizej_pierscienia: Union[str, None] = None
    kolor_trzonu_nad_pierscieniem: Union[str, None] = None
    kolor_trzonu_pod_pierscieniem: Union[str, None] = None
    rodzaj_oslony: Union[str, None] = None
    kolor_oslony: Union[str, None] = None
    liczba_pierscieni: Union[str, None] = None
    rodzaj_pierscienia: Union[str, None] = None
    kolor_wysypu_zarodnikow: Union[str, None] = None
    populacja: Union[str, None] = None
    srodowisko: Union[str, None] = None


@app.post("/grzyby/klasyfikuj/")
async def classify_mushroom(mushroom: Mushroom):

    # Pobranie danych z request json
    mushroomToClassify = [Mushroom(**mushroom.model_dump())]
    mushroomToClassify = pd.DataFrame([mod.model_dump() for mod in mushroomToClassify])
    dfmushroomToClassify = pd.DataFrame(mushroomToClassify)
    # Klasyfikacja przypadku

    #x_pred = dataset.iloc[-5:-4, 1:23]  # tymczasowy wybór ostatniej obserwacji ze zbioru treningowego
    x_pred = pd.DataFrame(dfmushroomToClassify)

    #Transformacja przypadku testowego
    x_pred_all = pd.concat([x, x_pred], ignore_index=True, sort=False) # połaczenie obserwacji testowej ze zbiorem treningowym
    x_pred_conv = pd.get_dummies(x_pred_all) # przekształcenie zmiennych kategorycznych

    prediction = model.predict(x_pred_conv.tail(1))[0]  # predykcja kategorii obserwacji testowej (jadalny / trujący)

    if (prediction == 'jadalny'):
         probs = model.predict_proba(x_pred_conv.tail(1))[0, 0] # prawdopodobieństwo przynależności do klasy jadalny
    else:
        probs = model.predict_proba(x_pred_conv.tail(1))[0, 1]

    return Response(rodzaj=prediction, prawdopodobienstwo=probs)

@app.get("/get-explanation")

async def get_explanation():
    #plt.figure()
    tree.plot_tree(model, filled=True, feature_names=x_conv.columns, class_names=y_conv.columns, fontsize=4)
    plt.savefig('Data//tree_explanation.png', format='png', bbox_inches="tight")

    return FileResponse("Data//tree_explanation.png")



@app.get("/get-data")
async def get_data():
    data = {}

    for column in dataset.columns:
        unique_values = dataset[column].unique().tolist()
        data[column] = unique_values

    if data:
        first_key = list(data.keys())[0]
        data.pop(first_key)

    return JSONResponse(content=data)