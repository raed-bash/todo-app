# Dockerfile

# Use Node Iron (lts 20.x.x) to build the image
FROM node:iron-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

ENV NODE_ENV production
RUN npm run build

# Serve using Nginx with the config specified within the project files
FROM nginx:stable
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build/ /usr/share/nginx/html/
