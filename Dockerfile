# стадия "build": сборка prod
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# стадия "dev": среда разработки
FROM node:22 AS dev

WORKDIR /app

COPY package*.json ./

RUN npm i
