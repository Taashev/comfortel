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

4.  Запуск проекта с помощью Docker Compose в режиме разработки:

    ```bash
    npm run docker:dev
    ```

5.  Запуск проекта с помощью Docker Compose в режиме продакшн:

    ```bash
    npm run docker:prod
    ```

6.  Если необходимо запустить только PostgreSQL, можно использовать команду:

    ```bash
    npm run docker:postgres
    ```

7.  Запуск приложения локально без Docker:

    ```bash
    npm install
    npm run start:dev
    ```

    При этом убедитесь, что в файле `.env` указаны правильные параметры подключения к базе данных.

8.  Для очистки контейнеров и сетей Docker, используйте команду:

    ```bash
    npm run docker:clear
    ```

9.  После запуска проекта, API будет доступен по адресу: [http://localhost:3000](http://localhost:3000)
