FROM postgres:11-alpine
MAINTAINER Wisdman <wisdman@ajaw.it>

ADD postgresql.conf /etc/postgresql.conf
ADD initdb.d /docker-entrypoint-initdb.d
ADD data /docker-entrypoint-initdb.d

RUN apk add --update --no-cache tzdata \
 && ln -fs /usr/share/zoneinfo/UTC /etc/localtime

EXPOSE 5432
CMD ["postgres", "-c", "config_file=/etc/postgresql.conf"]
