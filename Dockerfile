ARG NODE_IMAGE_TAG


FROM node:${NODE_IMAGE_TAG} AS build

WORKDIR /app

COPY ./src ./src
COPY ./package.json \
     ./tsconfig.json \
     ./.env \
     ./.env.loca[l] \
     ./

# TODO: use ci? set ci env?
RUN npm i

ENTRYPOINT ["node", "--env-file=.env", "src/server.ts"]