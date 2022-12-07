From node:18.11-alpine

WORKDIR /usr/app

copy . .

RUN npm ci --only=production

RUN npm run build

CMD [ "npm", "start" ]