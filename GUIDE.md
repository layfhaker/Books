# Пошаговое руководство: Добавление текстов

## Быстрый старт (5 минут)

### Шаг 1: Подготовка папок

Убедитесь, что у вас есть такая структура:

```
German-Reading-Platform/
│
├── index.html
├── style.css
├── script.js
├── texts/
│   ├── books.json
│   └── 1q84-part3/
│       └── chapter-1.json
└── README.md
```

### Шаг 2: Запуск

Просто откройте `index.html` в браузере (даже локально, без сервера).

---

## Добавление новой книги (подробно)

### Сценарий: Добавление книги "Das Abenteuer" (3 главы)

#### 1️⃣ Обновите `texts/books.json`

Текущий файл:
```json
[
    {
        "bookId": "1q84-part3",
        "bookTitle": "1Q84",
        "bookAuthor": "Харуки Мураkami",
        "chapters": [...]
    }
]
```

Добавьте новую книгу:
```json
[
    {
        "bookId": "1q84-part3",
        "bookTitle": "1Q84",
        "bookAuthor": "Харуки Мураkami",
        "chapters": [...]
    },
    {
        "bookId": "das-abenteuer",
        "bookTitle": "Das Abenteuer",
        "bookAuthor": "Autor Name",
        "description": "Захватывающее приключение",
        "chapters": [
            {
                "chapterId": "chapter-1",
                "chapterNumber": 1,
                "chapterTitle": "Der Anfang"
            },
            {
                "chapterId": "chapter-2",
                "chapterNumber": 2,
                "chapterTitle": "Die Reise"
            },
            {
                "chapterId": "chapter-3",
                "chapterNumber": 3,
                "chapterTitle": "Das Ende"
            }
        ]
    }
]
```

#### 2️⃣ Создайте папку для книги

```
texts/das-abenteuer/
```

#### 3️⃣ Создайте первую главу: `chapter-1.json`

```json
{
    "metadata": {
        "bookId": "das-abenteuer",
        "bookTitle": "Das Abenteuer",
        "bookAuthor": "Autor Name",
        "chapterId": "chapter-1",
        "chapterNumber": 1,
        "chapterTitle": "Der Anfang",
        "level": "A2",
        "language": "de",
        "createdDate": "2025-02-26",
        "description": "История начинает развиваться..."
    },
    "settings": {
        "showWordCount": true,
        "showDifficulty": true,
        "allowNotes": true
    },
    "content": [
        {
            "id": 1,
            "de": "Es war ein schöner Tag.",
            "ru": "Это был прекрасный день.",
            "type": "sentence",
            "difficulty": "A1",
            "tags": ["verb", "past"],
            "notes": null
        },
        {
            "id": 2,
            "de": "Ich ging ins Abenteuer spazieren.",
            "ru": "Я пошёл на прогулку в приключение.",
            "type": "sentence",
            "difficulty": "A2",
            "tags": ["verb", "past", "preposition"],
            "notes": "Глагол 'gehen' в Präteritum (простое прошедшее): ging"
        }
    ]
}
```

#### 4️⃣ Создайте вторую главу: `chapter-2.json`

```json
{
    "metadata": {
        "bookId": "das-abenteuer",
        "bookTitle": "Das Abenteuer",
        "bookAuthor": "Autor Name",
        "chapterId": "chapter-2",
        "chapterNumber": 2,
        "chapterTitle": "Die Reise",
        "level": "A2",
        "language": "de",
        "createdDate": "2025-02-26",
        "description": "Путешествие начинается..."
    },
    "settings": {
        "showWordCount": true,
        "showDifficulty": true,
        "allowNotes": true
    },
    "content": [
        {
            "id": 1,
            "de": "Wir fuhren mit dem Auto nach Norden.",
            "ru": "Мы ехали на машине на север.",
            "type": "sentence",
            "difficulty": "A2",
            "tags": ["verb", "past", "direction"],
            "notes": "Глагол 'fahren' в Präteritum: fuhren (ехать)"
        },
        {
            "id": 2,
            "de": "Die Landschaft war wunderbar.",
            "ru": "Пейзаж был чудесным.",
            "type": "sentence",
            "difficulty": "A1",
            "tags": ["adjective", "verb"],
            "notes": null
        }
    ]
}
```

#### 5️⃣ Создайте третью главу: `chapter-3.json`

```json
{
    "metadata": {
        "bookId": "das-abenteuer",
        "bookTitle": "Das Abenteuer",
        "bookAuthor": "Autor Name",
        "chapterId": "chapter-3",
        "chapterNumber": 3,
        "chapterTitle": "Das Ende",
        "level": "B1",
        "language": "de",
        "createdDate": "2025-02-26",
        "description": "История подходит к концу..."
    },
    "settings": {
        "showWordCount": true,
        "showDifficulty": true,
        "allowNotes": true
    },
    "content": [
        {
            "id": 1,
            "de": "Wir kamen am nächsten Morgen an.",
            "ru": "Мы прибыли на следующее утро.",
            "type": "sentence",
            "difficulty": "A2",
            "tags": ["verb", "past", "time"],
            "notes": "Глагол 'ankommen' в Präteritum: kamen"
        },
        {
            "id": 2,
            "de": "Es war ein unvergessliches Abenteuer gewesen.",
            "ru": "Это было незабываемое приключение.",
            "type": "sentence",
            "difficulty": "B1",
            "tags": ["verb", "perfect", "adjective"],
            "notes": "Plusquamperfekt (предпрошедшее время): Perfekt в прошедшем времени"
        }
    ]
}
```

### Итоговая структура:

```
texts/
├── books.json
├── 1q84-part3/
│   ├── chapter-1.json
│   ├── chapter-2.json
│   └── chapter-3.json
└── das-abenteuer/
    ├── chapter-1.json
    ├── chapter-2.json
    └── chapter-3.json
```

---

## Примеры для разных уровней

### A1 - Простые предложения

```json
{
    "id": 1,
    "de": "Das ist ein Buch.",
    "ru": "Это книга.",
    "type": "sentence",
    "difficulty": "A1",
    "tags": ["verb", "present"],
    "notes": null
}
```

### A2 - Более сложная грамматика

```json
{
    "id": 2,
    "de": "Ich lerne Deutsch, weil es interessant ist.",
    "ru": "Я изучаю немецкий, потому что это интересно.",
    "type": "sentence",
    "difficulty": "A2",
    "tags": ["verb", "conjunction", "present"],
    "notes": "Союз 'weil' требует инверсии порядка слов в придаточном предложении"
}
```

### B1 - Сложные времена

```json
{
    "id": 3,
    "de": "Wenn ich mehr Zeit hätte, würde ich das Buch lesen.",
    "ru": "Если бы у меня было больше времени, я бы читал эту книгу.",
    "type": "sentence",
    "difficulty": "B1",
    "tags": ["subjunctive", "conditional"],
    "notes": "Конъюнктив II для условных предложений"
}
```

---

## Типичные ошибки и как их избежать

### ❌ Ошибка 1: Неправильная структура JSON

```json
// ❌ НЕПРАВИЛЬНО - объект вместо массива
"content": {
    "id": 1,
    "de": "..."
}

// ✅ ПРАВИЛЬНО - массив объектов
"content": [
    {
        "id": 1,
        "de": "..."
    }
]
```

### ❌ Ошибка 2: Дублирующиеся ID

```json
// ❌ НЕПРАВИЛЬНО
"content": [
    { "id": 1, "de": "..." },
    { "id": 1, "de": "..." }  // ID повторяется!
]

// ✅ ПРАВИЛЬНО
"content": [
    { "id": 1, "de": "..." },
    { "id": 2, "de": "..." }
]
```

### ❌ Ошибка 3: Неправильный формат даты

```json
// ❌ НЕПРАВИЛЬНО
"createdDate": "26.02.2025"
"createdDate": "2025/02/26"

// ✅ ПРАВИЛЬНО
"createdDate": "2025-02-26"
```

### ❌ Ошибка 4: Несовпадение chapterId

```json
// В books.json:
"chapterId": "chapter-1"

// Но файл называется:
chapter_1.json  // ❌ НЕПРАВИЛЬНО

// Должен быть:
chapter-1.json  // ✅ ПРАВИЛЬНО
```

---

## Проверка перед загрузкой

Используйте эту чек-лист:

- [ ] JSON валиден (проверить на https://jsonlint.com/)
- [ ] Все ID уникальны в пределах главы
- [ ] Дата в формате YYYY-MM-DD
- [ ] chapterId совпадает в books.json и имя файла
- [ ] bookId совпадает во всех файлах
- [ ] Уровень из списка: A1, A2, B1, B2, C1, C2
- [ ] Языке всегда "de"
- [ ] Путь файла правильный: texts/bookId/chapter-N.json
- [ ] Обязательные поля заполнены
- [ ] Нет пустых строк в `de` и `ru`

---

## Готово! 🎉

Откройте `index.html` в браузере и выберите книгу из выпадающего списка.
