
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=${PORT}

EXPOSE ${PORT}

CMD ["npm", "start"]
