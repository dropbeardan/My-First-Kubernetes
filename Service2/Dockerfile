FROM node:11-alpine

ARG COMMIT_REF
ARG BUILD_DATE

RUN apk add yarn

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn install --production --silent

COPY src ./src

ENV APP_COMMIT_REF=${COMMIT_REF} \
  APP_BUILD_DATE=${BUILD_DATE}

EXPOSE 8080

CMD ["yarn", "start"]