FROM node:12-alpine

RUN mkdir /app
WORKDIR /app

COPY ./src /app/src
ADD ./package.json /app
ADD ./package-lock.json /app

RUN npm install --only=prod --verbose

CMD ["npm", "run", "start:prod"]
EXPOSE 3050
