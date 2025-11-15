ARG NODE_IMAGE_TAG=latest

FROM node:${NODE_IMAGE_TAG} AS build

WORKDIR /app

COPY ./src ./src
COPY ./package.json \
     ./package-lock.json \
     ./tsconfig.json \
     ./.env \
     ./.env.loca[l] \
     ./

# fail on warnings
ENV CI=true
RUN npm ci

ENTRYPOINT npm run prod