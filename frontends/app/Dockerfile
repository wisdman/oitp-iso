# wisdman/oitp-isov-app

FROM node:alpine
MAINTAINER Wisdman <wisdman@ajaw.it>

COPY . /app

RUN set -ex \
 && cd /app \
 && npm i \
 && NODE_ENV="production" npm run build


FROM nginx:stable-alpine
MAINTAINER Wisdman <wisdman@ajaw.it>

RUN set -ex \
 && rm -Rf /etc/nginx/* \
 && apk add --no-cache ca-certificates

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /app/artifacts /www

EXPOSE 80/tcp
STOPSIGNAL SIGTERM

CMD ["nginx"]
