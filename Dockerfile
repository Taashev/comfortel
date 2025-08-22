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

ENV NODE_ENV=development

COPY package*.json ./

RUN npm ci

VOLUME [ "/app/node_modules" ]

CMD [ "npm", "run", "start:dev" ]
