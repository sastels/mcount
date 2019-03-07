FROM node:11-alpine

WORKDIR /app
ADD . /app

RUN yarn
RUN yarn build

EXPOSE 3000

CMD yarn start
