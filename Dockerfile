
FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

ARG PORT=3000

ENV PORT=${PORT}

EXPOSE ${PORT}

CMD ["node", "index.js"]
