# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
#FROM node:7.10 as build-stage
FROM node AS  build-stage
#FROM  mhart/alpine-node:11 AS build-stage
#FROM node:11.10.0 AS build-stage

USER root
RUN mkdir /app
WORKDIR /app
COPY package*.json /app/

#RUN npm up
#RUN yarn

COPY /tmp/build/inputs/ /app/

WORKDIR /app/packages/objectstore-ui

#RUN yarn add next
RUN yarn
RUN yarn build
#RUN npm install next react react-dom
#RUN npm run build

WORKDIR /app/packages/seqdb-ui

RUN yarn
RUN yarn build
#RUN npm up
#RUN npm run build

# Stage 1, based on Caddy 2.0, to have only the compiled app, ready for production with Caddy
FROM caddy:2.0.0-alpine
RUN echo "From caddy:2.0.0-alpine"
USER root

ENV HTML_ROOT=objectstore-ui
ENV EXTERNAL_API_SVC=objectstore-api

COPY --from=build-stage /app/packages/objectstore-ui/out/ /app/packagehtml/objectstore-ui
COPY --from=build-stage /app/packages/seqdb-ui/out/ /app/packagehtml/seqdb-ui

COPY Caddyfile /app/Caddyfile
COPY Caddyfile /app/Caddyfile.template
COPY updateProxy.sh /app
RUN chmod +x /app/*.sh

RUN chgrp -R 0 /app/ && \
    chmod -R g=u /app/

RUN chgrp -R 0 /app/Caddyfile && \
    chmod -R g=u /app/Caddyfile

WORKDIR /app

USER 1000250000

EXPOSE 8080

ENTRYPOINT ["/app/updateProxy.sh"]
