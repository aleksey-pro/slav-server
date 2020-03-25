FROM node:12-alpine

RUN mkdir /app
WORKDIR /app

COPY ./src /app/src
COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm cache clear --force && npm install --only=prod --no-shrinkwrap --update-binary --verbose

CMD ["npm", "run", "start:prod"]
EXPOSE 3050
