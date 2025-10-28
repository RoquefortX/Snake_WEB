[![CI](https://github.com/RoquefortX/Snake_WEB/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/RoquefortX/Snake_WEB/actions/workflows/ci.yml)
[![Python 3.12](https://img.shields.io/badge/python-3.12-blue?logo=python)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
# Snake_WEB

Классическая игра "Змейка", созданная с использованием Flask, HTML5 Canvas и JavaScript.

## Демонстрация

![Snake_web_GP_demo](https://github.com/user-attachments/assets/49b94426-7775-46a8-a4d1-f4828583e8fd)

## Возможности

- Классический геймплей змейки
- Отслеживание очков с сохранением рекорда
- Функция паузы/возобновления игры
- Адаптивный дизайн
- Управление с клавиатуры (стрелки)
- Визуальная голова змеи с глазами
- Определение конца игры

## Инструкции по установке

### Вариант 1: Использование Docker (рекомендуется)

#### Использование Docker Compose

```bash
git clone https://github.com/RoquefortX/Snake_WEB.git
cd Snake_WEB
docker-compose up
```

Игра будет доступна по адресу `http://localhost:5000`

#### Использование Docker напрямую

```bash
docker build -t snake-game .
docker run -p 5000:5000 snake-game
```

### Вариант 2: Локальная установка Python

#### 1. Клонируйте репозиторий

```bash
git clone https://github.com/RoquefortX/Snake_WEB.git
cd Snake_WEB
```

#### 2. Создайте и активируйте виртуальное окружение

```bash
python3 -m venv venv
source venv/bin/activate  # На Windows: venv\Scripts\activate
```

#### 3. Установите зависимости

```bash
pip install -r requirements.txt
```

#### 4. Запустите приложение

```bash
python app.py
```

Игра будет доступна по адресу `http://127.0.0.1:5000`

## Как играть

- Используйте стрелки (↑ ↓ ← →) для управления змейкой
- Ешьте красную еду, чтобы расти и набирать очки
- Не врезайтесь в стены и в себя!
- Нажмите пробел для паузы/возобновления
- Нажмите "Начать игру" для начала игры
- Нажмите "Сброс" для перезапуска игры

## Структура проекта

```
Snake_WEB/
├── app.py                 # Flask приложение
├── requirements.txt       # Python зависимости
├── Dockerfile            # Конфигурация Docker контейнера
├── docker-compose.yml    # Конфигурация Docker Compose
├── .dockerignore         # Файл игнорирования Docker
├── tests_app.py          # Тесты приложения
├── templates/
│   └── index.html        # HTML шаблон игры
└── static/
    ├── css/
    │   └── style.css     # Стили игры
    └── js/
        └── game.js       # Логика игры
```

## Используемые технологии

- **Backend**: Flask 3.0.0
- **Frontend**: HTML5 Canvas, CSS3, Vanilla JavaScript
- **Тестирование**: pytest 7.4.3
- **Контейнеризация**: Docker, Docker Compose

## API Endpoints

- `GET /` - Главная страница игры
- `GET /health` - Endpoint проверки состояния (возвращает `{"status": "ok"}`)

## Запуск тестов

```bash
pytest tests_app.py -v
```

## Разработка

Приложение включает endpoint проверки состояния `/health` для целей мониторинга. При запуске с Docker Compose приложение настроено для режима разработки с монтированием томов для обновления кода в реальном времени.
