FROM node:18-alpine3.16

WORKDIR /app

COPY package.json package-lock.json  ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]