# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:7.10 as build-stage
#FROM  mhart/alpine-node:11 AS build-stage
#FROM node:11.10.0 AS build-stage

USER root
RUN mkdir /app
WORKDIR /app
COPY package*.json /app/

RUN npm up

COPY /tmp/build/inputs/ /app/
RUN ls -la
RUN ls -la packages
RUN ls -la packages/objectstore-ui

COPY ./packages/objectstore-ui/ /app/packages/objectstore-ui/
COPY ./packages/seqdb-ui/ /app/packages/seqdb-ui/
COPY ./packages/common-ui/ /app/packages/common-ui/

WORKDIR /app/packages/objectstore-ui

#RUN yarn add next
#RUN yarn build
#RUN npm install next react react-dom
#RUN npm run-script build

WORKDIR /app/packages/seqdb-ui

#RUN yarn build
#RUN npm run-script build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM abiosoft/caddy

USER root

ENV HTML_ROOT=objectstore-ui
ENV EXTERNAL_API_SVC=objectstore-api

COPY --from=build-stage /app/packages/objectstore-ui/out/ /app/packagehtml/objectstore-ui
COPY --from=build-stage /app/packages/seqdb-ui/out/ /app/packagehtml/seqdb-ui

COPY Caddyfile /app/Caddyfile
COPY Caddyfile /app/Caddyfile.template
COPY updateProxy.sh /app

RUN chgrp -R 0 /app/ && \
    chmod -R g=u /app/

RUN chgrp -R 0 /app/Caddyfile && \
    chmod -R g=u /app/Caddyfile

WORKDIR /app

USER 1000250000

EXPOSE 8080

ENTRYPOINT ["/app/updateProxy.sh"]
