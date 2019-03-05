FROM golang:alpine as api-auth-build
MAINTAINER Wisdman <wisdman@ajaw.it>

WORKDIR /oitp-isov

COPY go.mod /oitp-isov/go.mod
COPY go.sum /oitp-isov/go.sum
COPY ./vendor /oitp-isov/vendor
COPY ./lib /oitp-isov/lib
COPY ./auth /oitp-isov/api/auth

RUN apk add --update --no-cache git gcc musl-dev \
 && go build -o ./artifacts/api-auth github.com/wisdman/oitp-isov/api/auth

FROM alpine
COPY --from=api-auth-build /oitp-isov/artifacts/api-auth /
EXPOSE 80
CMD ["/api-auth"]
