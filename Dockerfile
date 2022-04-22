FROM node:lts-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN yarn add node-sass
RUN yarn

COPY . ./

CMD [ "yarn", "start" ]