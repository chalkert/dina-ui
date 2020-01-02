FROM exiasr/alpine-yarn-nginx as build-deps

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn

COPY . ./

EXPOSE 3000
RUN yarn add next
RUN yarn dev
#ENTRYPOINT ["/bin/sh"]
