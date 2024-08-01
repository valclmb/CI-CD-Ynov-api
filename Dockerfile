FROM node:20
WORKDIR /server

ENV PATH /server/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
# RUN npm install mysql2 dotenv express cors
RUN npm install --silent
RUN npm install jest -g --silent

EXPOSE 8000