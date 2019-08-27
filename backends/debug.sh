#!/bin/sh

ENV_DIR="$(dirname "$( cd "$(dirname "$0")" ; pwd -P )")"
PGDATABASE=oitp

case "$1" in
  api-auth)
    PORT=8081
    PGUSER=api-self
    PGPASSWORD_FILE="${ENV_DIR}/secret-api-self.env"

    eval "PORT=$PORT PGDATABASE=$PGDATABASE PGUSER=$PGUSER PGPASSWORD_FILE=$PGPASSWORD_FILE go run -mod=vendor ./api/auth"
    ;;
  api-payment)
    PORT=8082
    PGUSER=api-payment
    PGPASSWORD_FILE="${ENV_DIR}/secret-api-payment.env"

    eval "PORT=$PORT PGDATABASE=$PGDATABASE PGUSER=$PGUSER PGPASSWORD_FILE=$PGPASSWORD_FILE go run -mod=vendor ./api/payment"
    ;;
  api-public)
    PORT=8083
    PGUSER=api-public
    PGPASSWORD_FILE="${ENV_DIR}/secret-api-public.env"

    eval "PORT=$PORT PGDATABASE=$PGDATABASE PGUSER=$PGUSER PGPASSWORD_FILE=$PGPASSWORD_FILE go run -mod=vendor ./api/public"
    ;;
  api-self)
    PORT=8084
    PGUSER=api-self
    PGPASSWORD_FILE="${ENV_DIR}/secret-api-self.env"

    eval "PORT=$PORT PGDATABASE=$PGDATABASE PGUSER=$PGUSER PGPASSWORD_FILE=$PGPASSWORD_FILE go run -mod=vendor ./api/self"
    ;;
  *)
    echo "Error first argument" >&2
    exit 1
    ;;
esac
