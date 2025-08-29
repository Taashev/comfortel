# Тестовое задание для Comfortel

Задача:
Создать API для получения информации о пользователе из базы данных.

Данные пользователя:\
▸ Уникальный ID\
▸ Логин\
▸ ФИО\
▸ Пол\
▸ Возраст\
▸ Контакты (телефон/e-mail)\
▸ Аватар\
▸ Дата регистрации\
▸ Статус активности

Требования:

1. Использовать PostgreSQL или MongoDB.
2. Реализовать на TypeScript/Nest.js или Golang/Gin.

---

## Стек

- Node.js@22
- TypeScript
- Nest.js
- PostgreSQL@15
- Docker
- Docker Compose

## Настройка переменной окружения

Для работы с базой данных необходимо создать файл `.env` в корневой папке проекта и указать следующие переменные:

```env
# Порт, на котором будет запущено приложение
PORT=3000

# Адрес, на котором будет запущено приложение
# Для докер-контейнера указать 0.0.0.0
# Для локального запуска можно использовать localhost
HOST=0.0.0.0

# Режим работы приложения (development или production)
NODE_ENV=development

# Порт PostgreSQL
POSTGRES_PORT=5432

# Адрес PostgreSQL (контейнер Docker)
POSTGRES_HOST=postgres

# Имя базы данных
POSTGRES_DB=comfortel

# Пользователь PostgreSQL
POSTGRES_USER=postgres

# Пароль пользователя PostgreSQL
POSTGRES_PASSWORD=postgres

```

## Установка и запуск

Убедиться, что установлены следующие инструменты:

- [nvm](https://github.com/nvm-sh/nvm) или [Node.js](https://nodejs.org/)@22
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

1.  Клонировать репозиторий:

    ```bash
    git clone https://github.com/Taashev/comfortel.git
    ```

2.  Перейти в корневую папку проекта:

    ```bash
    cd comfortel
    ```

3.  Если используется nvm, выполнить команду:

    ```bash
    nvm install 22
    nvm use
    ```

4.  Установить зависимости:

```bash
  npm ci
```

5.  Запуск проекта с помощью Docker Compose в режиме разработки:\
    Приложение монтируется в докер из локального хоста и крутиться там в одной сети с другими контейнерами.

    ```bash
    npm run docker:dev
    ```

6.  Запуск проекта с помощью Docker Compose в режиме дебага для отлаживания через дебагер:\
    Приложение монтируется в докер из локального хоста и крутиться там в одной сети с другими контейнерами.

    ```bash
    npm run docker:debug
    ```

    настройка дебагера для vscode

    ```json
    {
      "type": "node",
      "request": "attach",
      "name": "Docker",
      "address": "localhost",
      "port": 9229,
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "/app",
      "protocol": "inspector",
      "restart": true,
      "skipFiles": [
        "<node_internals>/**",
        "**/node_modules/**",
        "**/.pnpm/**",
        "**/tslib/**"
      ]
    }
    ```

7.  Если необходимо запустить только PostgreSQL:

    ```bash
    npm run docker:postgres
    ```

    Убедиться, что в файле `.env` указаны правильные параметры подключения к базе данных.

8.  Для очистки контейнеров и сетей Docker, использовать команду:

    ```bash
    npm run docker:clear
    ```

9.  Для очистки контейнеров вместе с volumes, использовать команду:

    ```bash
    npm run docker:clear -- -v
    ```

10. После запуска проекта, API будет доступен по адресу: [http://localhost:3000](http://localhost:3000)

---

## API Эндпоинты

- GET `/users`
  - Описание: Возвращает список пользователей.
  - Ответ: Массив объектов пользователя.

- GET `/users/:id`
  - Описание: Возвращает пользователя по `id` (UUID v4).
  - Параметры: `id` — UUID v4.
  - Ответ: Объект пользователя.

- POST `/users`
  - Описание: Создаёт пользователя.
  - Тело (JSON):
    - Обязательные: `login`, `firstName`, `lastName`, `gender`, `birthDate (YYYY-MM-DD)`, `email`.
    - Необязательные: `phone`, `avatar`, `middleName`.
  - Ответ: Созданный объект пользователя.

- PATCH `/users/:id`
  - Описание: Частично обновляет данные пользователя (кроме статуса id и статуса активности).
  - Параметры: `id` — UUID v4.
  - Тело (JSON): Любое подмножество полей из POST (см. выше). Поля со значением `undefined` игнорируются.
  - Ответ: Обновлённый объект пользователя.

- GET `/users/:id/signin`
  - Описание: Включает статус активности пользователя (`isActive = true`).
  - Параметры: `id` — UUID v4.
  - Ответ: Обновлённый объект пользователя.

- GET `/users/:id/signout`
  - Описание: Переключает статус активности пользователя (`isActive = true/false`).
  - Параметры: `id` — UUID v4.
  - Ответ: Обновлённый объект пользователя.

Структура объекта пользователя в ответе

- Поля: `id`, `createdAt`, `login`, `firstName`, `middleName`, `lastName`, `gender`, `birthDate`, `phone`, `email`, `avatar`, `isActive`, `fullName` (склеенное ФИО).
- Примечание: `fullName` — вычисляемое поле на основе ФИО.
