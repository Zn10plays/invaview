FROM node:18.11-alpine

WORKDIR /usr/app

COPY . .

RUN npm ci --only=production

RUN npm run build

CMD [ "npm", "start" ]