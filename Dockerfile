ARG NODE_IMAGE_TAG=latest

FROM node:${NODE_IMAGE_TAG} AS build

WORKDIR /app

ARG APP_ENV=production

COPY ./src ./src
COPY ./package.json \
     ./package-lock.json \
     ./tsconfig.json \
     ./.env \
     ./.env.loca[l] \
     ./

# fail on warnings
ENV NODE_ENV=${APP_ENV}
ENV CI=true
RUN npm ci

ENTRYPOINT npm run prod