FROM nginx:stable-alpine
MAINTAINER Wisdman <wisdman@ajaw.it>

RUN set -ex \
 && rm -Rf /etc/nginx/* \
 && apk add --no-cache ca-certificates openssl \
 && openssl dhparam -out /etc/nginx/dhparam.pem 1024 \
 && openssl req -x509 -nodes -days 3650 -newkey rsa:1024 -subj "/C=RU/ST=UR/O=VLL/CN=localhost" \
    -keyout /etc/nginx/privkey.pem \
    -out /etc/nginx/fullchain.pem

COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d /etc/nginx/conf.d
COPY ssl /etc/nginx/ssl

COPY assets /assets

EXPOSE 80 443
STOPSIGNAL SIGTERM

CMD ["nginx"]
