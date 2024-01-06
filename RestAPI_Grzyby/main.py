# Praca zaliczeniowa z przedmiotu "Zaawansowane programowanie"

# pip install "uvicorn[standard]" - instalacja serwera
# uvicorn main:app --reload - uruchomienie serwera
# http://127.0.0.1:8000/docs - dokumentacja usługi REST API

# version 0.1 - Initial version - Phantom REST API

from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel

#predict
prediction = "to be added later"

#probabilities
probs = 0.01

app = FastAPI()


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
    return Response(rodzaj=prediction, prawdopodobienstwo=probs)