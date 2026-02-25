# 📋 Шпаргалка: Быстрый справочник

## Структура файла JSON (копировать-вставить)

### Минимальный файл главы

```json
{
    "metadata": {
        "bookId": "my-book-id",
        "bookTitle": "Название книги",
        "chapterId": "chapter-1",
        "chapterNumber": 1,
        "level": "A2",
        "language": "de",
        "createdDate": "2025-02-26"
    },
    "content": [
        {
            "id": 1,
            "de": "Текст на немецком",
            "ru": "Перевод на русский",
            "type": "sentence"
        }
    ]
}
```

### Полный файл главы

```json
{
    "metadata": {
        "bookId": "my-book-id",
        "bookTitle": "Название книги",
        "bookAuthor": "Автор",
        "chapterId": "chapter-1",
        "chapterNumber": 1,
        "chapterTitle": "Название главы",
        "level": "A2",
        "language": "de",
        "createdDate": "2025-02-26",
        "description": "Описание главы"
    },
    "settings": {
        "showWordCount": true,
        "showDifficulty": true,
        "allowNotes": true
    },
    "content": [
        {
            "id": 1,
            "de": "Текст на немецком",
            "ru": "Перевод на русский",
            "type": "sentence",
            "difficulty": "A2",
            "tags": ["verb", "present"],
            "notes": "Пояснение грамматики"
        }
    ]
}
```

---

## Обновление books.json (копировать-вставить)

```json
[
    {
        "bookId": "book-id-1",
        "bookTitle": "Название первой книги",
        "bookAuthor": "Автор 1",
        "description": "Описание",
        "chapters": [
            {
                "chapterId": "chapter-1",
                "chapterNumber": 1,
                "chapterTitle": "Название первой главы"
            },
            {
                "chapterId": "chapter-2",
                "chapterNumber": 2,
                "chapterTitle": "Название второй главы"
            }
        ]
    },
    {
        "bookId": "book-id-2",
        "bookTitle": "Название второй книги",
        "bookAuthor": "Автор 2",
        "chapters": [
            {
                "chapterId": "chapter-1",
                "chapterNumber": 1
            }
        ]
    }
]
```

---

## Валидные значения

### Уровни сложности (level)
```
A1 (Начинающий)
A2 (Элементарный)
B1 (Средний)
B2 (Выше среднего)
C1 (Продвинутый)
C2 (Высокий)
```

### Типы контента (type)
```
sentence  (Предложение)
paragraph (Параграф)
phrase    (Фраза)
```

### Язык (language)
```
de (Немецкий - всегда "de")
```

### Формат даты (createdDate)
```
YYYY-MM-DD
Примеры: 2025-02-26, 2024-01-01, 2025-12-31
```

---

## Теги (tags) - примеры

```json
// Грамматика
["verb", "noun", "adjective", "adverb", "preposition", "conjunction"]

// Время глагола
["present", "past", "perfect", "future", "conditional", "subjunctive"]

// Специальные
["modal", "passive", "relative_clause", "superlative"]

// Тематические
["time", "weather", "emotion", "action", "description"]
```

---

## Ссылки на файлы

```
index.html         → Главный сайт
script.js          → JavaScript логика
style.css          → Стили
texts/books.json   → Список книг
texts/book-id/chapter-1.json  → Главы книг
```

---

## Команды для проверки

### Проверка JSON синтаксиса
Используйте https://jsonlint.com/ и скопируйте содержимое файла

### Проверка структуры
1. Откройте браузерную консоль (F12 → Console)
2. Откройте сайт
3. Если есть ошибки, они будут там

---

## Типичные проблемы и решения

| Проблема | Решение |
|----------|---------|
| Глава не загружается | Проверить имя файла совпадает с `chapterId` в books.json |
| JSON не валиден | Скопировать в https://jsonlint.com/ и исправить ошибки |
| Выпадающий список пуст | Проверить, что массив `chapters` не пустой в books.json |
| Модальное окно не работает | Обновить страницу (Ctrl+R или Cmd+R) |
| Текст на русском не кодируется | Убедиться, что файл сохранён в UTF-8 |

---

## Быстрое добавление текста

### Для новой книги (5 шагов):

1. **Отредактируйте** `texts/books.json` - добавьте новую книгу
2. **Создайте папку** `texts/my-book-id/`
3. **Создайте файл** `texts/my-book-id/chapter-1.json` с контентом
4. **Обновите** `texts/books.json` с `chapterId` для главы
5. **Откройте** сайт в браузере - готово! ✅

### Для новой главы к существующей книге (2 шага):

1. **Добавьте главу** в `books.json` в массив `chapters`
2. **Создайте файл** `texts/book-id/chapter-N.json`

---

## Примеры для копирования

### Простое предложение A1
```json
{
    "id": 1,
    "de": "Ich bin Schüler.",
    "ru": "Я ученик.",
    "type": "sentence",
    "difficulty": "A1"
}
```

### Предложение A2 с примечанием
```json
{
    "id": 2,
    "de": "Ich lerne Deutsch und Englisch.",
    "ru": "Я изучаю немецкий и английский языки.",
    "type": "sentence",
    "difficulty": "A2",
    "tags": ["verb", "conjunction"],
    "notes": "Глагол 'lernen' + два объекта через 'und'"
}
```

### Предложение B1 со сложностью
```json
{
    "id": 3,
    "de": "Obwohl es regnete, gingen wir spazieren.",
    "ru": "Хотя шёл дождь, мы пошли гулять.",
    "type": "sentence",
    "difficulty": "B1",
    "tags": ["conjunction", "subjunctive"],
    "notes": "Придаточное предложение с 'obwohl' требует инверсии"
}
```

---

## Символы для копирования

```
Немецкие умлауты:
ä, ö, ü (маленькие)
Ä, Ö, Ü (большие)

Спецсимволы:
ß (эсцет/шарпфес-s)
```

---

## Горячие клавиши в браузере

```
F12             → Открыть консоль разработчика
Ctrl+Shift+J    → Открыть консоль (Chrome)
Cmd+Option+J    → Открыть консоль (Mac)
Ctrl+R          → Перезагрузить страницу
Ctrl+Shift+R    → Жёсткая перезагрузка (очистить кэш)
```

---

## Сохранение файлов

**Важно:** Все файлы должны быть сохранены в формате **UTF-8**

В большинстве редакторов:
- VS Code: выбрать UTF-8 в правом нижнем углу
- Notepad++: Encoding → UTF-8 without BOM
- Sublime Text: File → Save with Encoding → UTF-8

---

## Что дальше?

- 📖 Прочитайте полную документацию в `README.md`
- 📝 Следуйте примерам в `GUIDE.md`
- 🧪 Проверяйте JSON в https://jsonlint.com/
- 🚀 Добавляйте больше текстов и наслаждайтесь обучением!

---

Готово! Нужна помощь? Проверьте раздел "Типичные проблемы и решения" выше.
