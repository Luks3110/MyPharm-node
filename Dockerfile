FROM node:alpine

LABEL maintainer  = "Lucas Fernandes Pereira <lucas_haya@hotmail.com>"

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install

COPY . .