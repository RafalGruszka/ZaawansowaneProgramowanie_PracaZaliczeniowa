# Klasyfikacja grzybów ![](https://img.shields.io/badge/Code-React-informational?style=flat&logo=react&color=61DAFB) ![](https://img.shields.io/badge/Code-Python-informational?style=flat&logo=python&color=FFE873) ![](https://img.shields.io/badge/Code-Node.js-informational?style=flat&logo=python&color=#68a063)
<img src="https://github.com/RafalGruszka/ZaawansowaneProgramowanie_PracaZaliczeniowa/assets/44302831/da3e346d-5111-4b65-b0c7-5bbcfa901864" width="450" height="300" />

## Projekt zaliczeniowy wykonany w ramach zajęć z przedmiotu Zaawansowane programowanie na kierunku Informatyka - II stopnia, ns. sem.1 - Styczeń 2024
### Autorzy projektu 
Rafał Gruszka, Dawid Furs
### Opis projektu
Projekt składa się z części serwerowej, tj. usług RestAPI wykonanej w jezyku Python oraz klienta komunikującego się z usługą (aplikacja webowa React). Aplikacja po stronie serwera bazuje na modelu ML drzew decyzyjnych służacym do klasyfikacji grzybów (jadalny / trujący) na podstawie podanych cech.Aplikacja po stronie klienta obejmuje graficzny (webowy) intefejs użytkownika pozwalając na wybór cech badanego grzyba oraz prezentuje wynik klasyfikacji.

#### Serwer - usługa w standardzie REST (RestAPI)
Użyte pakiety: FastAPI, sklearn, uvicorn, pandas. <br>
Do wytrenowania modelu został wykorzystany zbiór danych **mushrooms.csv** (przetłumaczony na język polski). 
        
Dostępne endpointy:
* http://127.0.0.1:8000/grzyby/klasyfikuj/ (POST request, request body w formacie JSON - format przykładowego body dostepny w katalogu /RestAPI_Grzyby/Data/example_request.json). Jako odpowiedź zwracana jest informacja o tym, czy grzyb jest jadalny, czy trujący wraz z pradopodobieństwem poprawności wykonanej klasyfikaji w przedziale od 0 do 1. <br>

Rsponse body (przykład): 
```
{
"rodzaj": "jadalny",
"prawdopodobienstwo": 1.0
}
```
* http://127.0.0.1:8000/get-data (GET request - pobranie nazw zmiennych i wartości cech) <br> 
* http://127.0.0.1:8000/get-explanation (GET request - pobranie diagramu drzewa decyzyjnego) <br>
        

##### Opis uruchomienia
Aplikacja wymaga instalacji serwera uvicorn. Z terminala środowiska IDE wykonać polecenia: 
```
pip install "uvicorn[standard]" (instalacja serwera)
uvicorn main:app --reload (uruchomienie serwera)
```
Dokumentacja usługi REST w formacie Swagger dostępna pod adresem: http://127.0.0.1:8000/docs
#### Klient - Apllikacja webowa React 
W celu korzystania z aplikacji webowej należy zainstalować node.js w wersji 20.11.0 LTS lub nowszej.
Następnie z terminala środowiska IDE wykonać polecenie:
```
npm install
npm install react-router-dom
npm start
```
Jeśli stona webowa nie zostanie automatycznie włączona, należy udać się pod adres http://localhost:3000
