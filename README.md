# PET Training — Target English

Два полных тренировочных теста в формате Cambridge B1 Preliminary (PET): Reading (6 частей, 32 вопроса), Writing (Part 1 + Part 2), Speaking (Part 1 — интервью, Part 3 — совместное задание «обсудите и решите», Part 4 — дискуссия; плюс бонус: описание фото).

Обычный статический сайт: никаких сборок, npm и серверов. Шрифты подгружаются с Google Fonts (без них сайт тоже работает, просто с системными шрифтами).

## Структура

```
index.html            — главная со ссылками на тесты
test1.html            — Preliminary Test 1
test2.html            — Preliminary Test 2
vercel.json           — настройки Vercel (чистые URL, кэш)
assets/css/style.css  — фирменные стили
assets/js/engine.js   — общий движок (проверка, таймеры, Writing, Speaking)
assets/js/test1-data.js, test2-data.js — тексты, ключи, объяснения, образцы, задания Speaking
assets/js/images.js   — фото для бонусного раздела (встроены в код, всегда загружаются)
assets/img/speaking/  — те же 8 фото отдельными файлами (запасной вариант)
```

## Как выложить

### GitHub
1. На github.com: **New repository** (например, `pet-training`), без README.
2. Нажмите **uploading an existing file**, перетащите ВСЕ файлы и папки из распакованного архива (папка `assets` целиком), затем **Commit changes**.

### Vercel
1. На vercel.com: **Add New → Project → Import** репозиторий `pet-training`.
2. Framework Preset: **Other**. Build Command и Output Directory оставьте пустыми. Нажмите **Deploy**.
3. Адреса: `/` — главная, `/test1`, `/test2`.

Любое изменение в GitHub автоматически обновляет сайт.

## Как править содержание

Все тексты находятся в `assets/js/test1-data.js` и `test2-data.js`. Имена учеников — поле `names` в начале файла. Speaking Part 3 — в разделе `speaking.collab` (ситуация, 5 вариантов, вопросы экзаменатора). Фото-бонус — `speaking.rounds`.

Ответы и тексты учеников сохраняются только в браузере (localStorage) и никуда не отправляются. Кнопка «Скопировать результат» на вкладке «Итог» формирует краткий отчёт для преподавателя.
