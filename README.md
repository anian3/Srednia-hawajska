# Srednia-hawajska
Aplikacja do tworzenia i wypełaniania quizów, w których gracz wykrywa 'codesmell'e.

## Table of Contents
- [Instalacja ](#installation)
- [Usage](#usage)
- [Features](#features)

## Instalacja 

Frontend:
```
cd .../Frontend
npm install
```

Backend:
```
cd .../Backend/rest-service
./gradlew build
```

CICD:
```
npm install
```


Odpalać na osobnych terminalach!

## Uruchomienie

Frontend:
```
cd .../Frontend
npm run dev
```

Backend:
```
cd .../Backend/rest-service
./gradlew bootRun
```

## Features
- Użytkownik może wypełniać quiz, w którym zaznacza w których liniach widzi codesmell z wcześniej podanej listy.
- Możliwość zaznaczania zarówno pojedynczych, jak i wieloliniowych codesmell.
- Po zatwierdzeniu rozwiązania użytkownik otrzymuje informacje o skuteczności.
- Administrator może zarządzać quizami, dodawać, usuwać, edytować.

## Definition of done
Zadanie może zostać zamknięte kiedy:
-Kod spełniający wymagania akceptacyjne jest na branchu na repozytorium
-Co najmniej dwóch developerów zrobi review i zatwierdzi zmiany
-Branch, na którym znajdują się zmiany, zostanie zmergowany
-Na jirze zadanie zostanie oznaczone jako Done
-Wszystkie subtaski user story są zakończone
Żeby zakończyć user story, wszystkie jego subtaski muszą również być zakończone.



