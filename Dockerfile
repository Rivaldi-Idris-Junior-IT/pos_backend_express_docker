FROM node:latest

RUN mkdir -p /backend

WORKDIR /backend

COPY package.json . 

COPY . .

RUN npm install

VOLUME /backend/logfile

VOLUME /backend/public/upload

EXPOSE 4500

CMD ["node", "app.js"]
