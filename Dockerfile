# docker image build -t mcount:v1 .
# docker container run -it -p 3000:3000 mcount:v1

FROM node:11-alpine

WORKDIR /app
ADD . /app

RUN yarn
RUN yarn build

EXPOSE 3000

CMD yarn start
