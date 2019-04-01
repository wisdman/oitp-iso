FROM golang:alpine as api-build
MAINTAINER Wisdman <wisdman@ajaw.it>

ADD . /build
WORKDIR /build

ARG APP_NAME
RUN go build -mod=vendor -o api-bin ./$APP_NAME


FROM alpine
MAINTAINER Wisdman <wisdman@ajaw.it>
COPY --from=api-build /build/api-bin /

EXPOSE 80
CMD ["/api-bin"]
