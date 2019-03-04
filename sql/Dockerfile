FROM postgres:11-alpine
MAINTAINER Wisdman <wisdman@ajaw.it>

COPY postgresql.conf /etc/postgresql.conf
COPY initdb.d /docker-entrypoint-initdb.d

RUN apk add --update --no-cache tzdata \
 && ln -fs /usr/share/zoneinfo/UTC /etc/localtime

EXPOSE 5432
CMD ["postgres", "-c", "config_file=/etc/postgresql.conf"]
