Projekt zaliczeniowy wykonany w ramach zajęć z przedmiotu Zaawansowane programowanie na kierunku Informatyka - II stopnia, ns. sem.1.

Autorzy projektu: Rafał Gruszka, Dawid Furs
Projekt składa się z następujących elementów:
  1. Usługa RestAPI stworzona w języku Python (pakiety: FastAPI, sklearn). Usługa wykonuje klasyfikację grzybów na podstawie podanych cech, wykorzystując model machine learning drzew decyzyjnych (decision tree).
  Do wytrenowania modelu został wykorzystany zbiór danych "mushroom" (przetłumaczony na język polski). Jako odpowiedź zwracana jest informacja w formacie JSON o tym, czy grzyb jest jadalny, czy trujący wraz z          pradopodobieństwem wykonanej klasyfikaji w przedziale od 0 do 1. 
  2. Klient usługi Rest, który wysyła żądanie POST dot. klasyfikacji grzyba przekazując request body w formacie JSON. 
    
