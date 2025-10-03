FROM node:lts-bullseye
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
