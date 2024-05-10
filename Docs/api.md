# API
## Konwencja
Zwracamy jsona w formie struktury katalogów i plików. Id pliku/katalogu to jego ścieżka od katalogu w którym trzymamy wszystkie quizy.

Każdy katalog ma:
- id (ścieżkę)
- typ (directory)
- listę dzieci

Każdy plik ma:
- id (ścieżkę)
- typ (file)
- listę code smelli
    - linia w której sie zaczyna (inclusive)
    - linia w której się kończy (inclusive)
    - kategoria
- kod źródłowy

Przechowywanie code smelli chyba najlepiej by było zrobić tak, że mamy dwa katalogi: quizzes i code smells, w nich pod tymi samymi nazwami plików w tak samo ułożonych katalogach są odpowiednio pliki txt z kodem i pliki z code smellami w formacie jsonowym jak poniżej.
Żeby nie przesyłać niepotrzebnie tych samych danych między frontem a backiem wydaje mi się że najlepiej zrobić ocenianie quizu na froncie - będą tam już wszystkie niezbędne dane aby to zrobić.

## Endpointy
-  plik po kluczu (ścieżka jako klucz)
    - request: GET apiv1/quizfile/{path}
    - response - json w formacie jak poniżej:
```JSON
{
	"id": "quiz1/plik1.txt",
	"type": "file",
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
	],
	"code": "tutaj leci sformatowany \nwielolonijkowy kod, \nktory mam nadzieje ze zadziala"
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
- quiz ze ścieżki korzenia - od razu walimy cały
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
                    "type": "file",
                    "codesmell": [
                        {
                            "linebegin": 5,
                            "lineend": 5,
                            "category": "naming conventions"
                        },
                        {
                            "linebegin": 10,
                            "lineend": 10,
                            "category": "formatting"
                        }
                    ],
                    "code": "tutaj leci sformatowany\nwielolonijkowy kod,\nktory mam nadzieje ze zadziala"
                }
            ]
        },
        {
            "id": "/quiz1/plik1.txt",
            "type": "file",
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
            ],
            "code": "tutaj leci sformatowany \nwielolonijkowy kod, \nktory mam nadzieje ze zadziala"
        },
        {
            "id": "/quiz1/plik2.txt",
            "type": "file",
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
            ],
            "code": "tutaj leci sformatowany \nwielolonijkowy kod, \nktory mam nadzieje ze zadziala"
        }
    ]
}
```
