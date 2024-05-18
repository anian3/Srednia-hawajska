### Konwencja
Zwracamy jsona w formie struktury katalogów i plików. Id pliku/katalogu to jego ścieżka od katalogu w którym trzymamy wszystkie quizy.

Każdy katalog ma:
- id (ścieżkę)
- typ (directory)
- listę dzieci

Każdy plik ma:
- id (ścieżkę)
- typ (file)
- język
- listę kategorii występujących w danym pliku
- listę code smelli
    - linia w której sie zaczyna (inclusive)
    - linia w której się kończy (inclusive)
    - kategoria

Przechowywanie code smelli: mamy dwa katalogi: quizzes i code smells, w nich pod tymi samymi nazwami plików w tak samo ułożonych katalogach są odpowiednio pliki txt z kodem i pliki z code smellami w formacie jsonowym jak poniżej.
Żeby nie przesyłać niepotrzebnie tych samych danych między frontem a backiem ocenianie quizu robimy na froncie.

### Endpointy
-  plik po kluczu (ścieżka jako klucz)
    - request: GET apiv1/quizfile/{path}
    - response - json w formacie jak poniżej:
```JSON
{
    "id": "quiz1/plik1.txt",
    "type": "file",
    "language": "python",
    "categories": [
        "kategoria1",
        "kategoria2"
    ],
    "codesmell": [
        {
            "linebegin": 2,
            "lineend": 2,
            "category": "kategoria1"
        },
        {
            "linebegin": 7,
            "lineend": 10,
            "category": "kategoria2"
        }
    ]
}
```
- lista quizów (nazwy i ścieżki do korzenia)
    - request: GET apiv1/quizzes
    - response - zwraca listę id czyli ścieżek do root katalogu quizów:
```JSON
{
    "quizzes": [
        {
            "id": "/quiz1"
        },
        {
            "id": "/quiz2"
        }
    ]
}
```
-  struktura quizu:
    - request: GET apiv1/quizstructure/{rootpath}
    - response - json ukazujący strukturę katalogu z quizem - pliki to liście, każdy katalog ma listę dzieci, które mogą być katalogami lub plikami:
```JSON
{
    "id": "/quiz1",
    "type": "directory",
    "children": [
        {
            "id": "/quiz1/subdir",
            "type": "directory",
            "children": [
                {
                    "id": "quiz1/subdir/plik.txt",
                    "type": "file"
                }
            ]
        },
        {
            "id": "/quiz1/plik1.txt",
            "type": "file"
        },
        {
            "id": "/quiz1/plik2.txt",
            "type": "file"
        }
    ]
}
```
- quiz ze ścieżki korzenia - od razu cały
    - request: GET apiv1/quiz/{rootpath}
    - response - tak jak powyżej ale od razu z zawartością plików:
```JSON
{
    "id": "/quiz1",
    "type": "directory",
    "children": [
        {
            "id": "/quiz1/subdir",
            "type": "directory",
            "children": [
                {
                    "id": "quiz1/subdir/plik.txt",
                    "type": "file"
                }
            ]
        },
        {
            "id": "/quiz1/plik1.txt",
            "type": "file"
        },
        {
            "id": "/quiz1/plik2.txt",
            "type": "file"
        }
    ]
}
```
- quiz ze ścieżki korzenia - od razu cały
    - request: GET apiv1/quiz/{rootpath
      }
    - response - tak jak powyżej ale od razu z zawartością plików:
```JSON
{
  "id": "/quiz1",
  "type": "directory",
  "children": [
    {
      "id": "/quiz1/subdir",
      "type": "directory",
      "children": [
        {
          "id": "quiz1/subdir/plik.txt",
          "type": "file",
          "language": "go",
          "categories": [
            "kategoria1",
            "kategoria2"
          ],
          "codesmell": [
            {
              "linebegin": 5,
              "lineend": 5,
              "category": "kategoria1"
            },
            {
              "linebegin": 10,
              "lineend": 10,
              "category": "kategoria2"
            }
          ]
        }
      ]
    },
    {
      "id": "/quiz1/plik1.txt",
      "type": "file",
      "language": "java",
      "categories": [
        "kategoria1",
        "kategoria2"
      ],
      "codesmell": [
        {
          "linebegin": 2,
          "lineend": 3,
          "category": "kategoria1"
        },
        {
          "linebegin": 7,
          "lineend": 10,
          "category": "kategoria2"
        }
      ]
    },
    {
      "id": "/quiz1/plik2.txt",
      "type": "file",
      "language": "python",
      "categories": [
        "kategoria3",
        "kategoria4"
      ],
      "codesmell": [
        {
          "linebegin": 7,
          "lineend": 7,
          "category": "kategoria3"
        },
        {
          "linebegin": 8,
          "lineend": 9,
          "category": "kategoria4"
        }
      ]
    }
  ]
}
```
