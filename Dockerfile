FROM node:12-alpine

RUN mkdir /app
WORKDIR /app

COPY ./src /app/src
COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm install --only=prod

CMD ["npm", "run", "start:prod"]
EXPOSE 3050
