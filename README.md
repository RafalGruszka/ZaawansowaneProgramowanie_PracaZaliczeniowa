Projekt zaliczeniowy wykonany w ramach zajęć z przedmiotu Zaawansowane programowanie na kierunku Informatyka - II stopnia, ns. sem.1.
Styczeń 2024
Autorzy projektu: Rafał Gruszka, Dawid Furs
Projekt składa się z części serwerowej, tj. usługi RestAPI i klienta komunikującego się z usługą (aplikacja webowa).

##############################  Serwer - usługa w standardzie REST (RestAPI) ###########################  
      Usługa RestAPI stworzona w języku Python (pakiety: FastAPI, sklearn, uvicorn, pandas). 
      Usługa wykonuje klasyfikację grzybów na podstawie podanych cech, wykorzystując model machine learning drzew decyzyjnych (decision tree). 
      Do wytrenowania modelu został wykorzystany zbiór danych "mushrooms.csv" (przetłumaczony na język polski). 
        
        Wywołanie usługi: 
        Wywołanie usługi polega na przekazaniu cech badanego grzyba.
        # POST request: http://127.0.0.1:8000/grzyby/klasyfikuj/ (request body w formacie JSON - format przykładowego body dostepny w katalogu /RestAPI_Grzyby/Data/example_request.json)    
        
        Odpowiedź:
        Jako odpowiedź wracana jest informacja o tym, czy grzyb jest jadalny, czy trujący wraz z pradopodobieństwem poprrawności wykonanej klasyfikaji w przedziale od 0 do 1.
        Rsponse body (przykład): 
          {
              "rodzaj": "jadalny",
              "prawdopodobienstwo": 1.0
          }
       
       # Opis uruchomienia #
       Aplikacja wymaga instalacji serwera uvicorn 
       Z terminala środowiska IDE wykonać polecenia: 
          pip install "uvicorn[standard]" (instalacja serwera)
          uvicorn main:app --reload (uruchomienie serwera)
        Dokumentacja usługi REST w formacie Swagger dostępna pod adresem: http://127.0.0.1:8000/docs
    
##############################  Klient - Apllikacja webowa React #########################################
      Klient usługi Rest jako aplikacja webowa zbudowana z wykorzytaniem biblioteki React. 
      Aplikacja webowa pozwala na wprowadzenie cech badanego grzyba wysyłając żądanie klasyfikacji POST (request body body w formacie JSON). 
      W celu korzystania z aplikacji webowej należy zainstalować node.js w wersji 20.11.0 LTS lub nowszej.
      Następnie z terminala środowiska IDE wykonać polecenie:
            npm install
            npm start
      Jeśli stona webowa nie zostanie automatycznie włączona, należy udać się pod adres http://localhost:3000
