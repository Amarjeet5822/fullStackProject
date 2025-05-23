FROM node:latest

COPY app.js /home/app/app.js
COPY package.json /home/app/package.json

WORKDIR home/app/

RUN npm install

CMD ["node", "app"]