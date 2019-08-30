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

    TINKOFF_API_URL="https://securepay.tinkoff.ru/v2"
    TINKOFF_TERMINAL_KEY=1562056284498DEMO
    TINKOFF_PASSWORD=m476i49fnqbf2s34

    eval "PORT=$PORT PGDATABASE=$PGDATABASE PGUSER=$PGUSER PGPASSWORD_FILE=$PGPASSWORD_FILE TINKOFF_API_URL=$TINKOFF_API_URL TINKOFF_TERMINAL_KEY=$TINKOFF_TERMINAL_KEY TINKOFF_PASSWORD=$TINKOFF_PASSWORD go run -mod=vendor ./api/payment"
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
  daemon-msg-email)
    PGUSER=daemon-msg
    PGPASSWORD_FILE="${ENV_DIR}/secret-daemon-msg.env"

    SMTP_SERVER=smtp.elasticemail.com
    SMTP_PORT=2525
    SMTP_USER=wisdman@wisdman.io
    SMTP_PASSWORD=094f3f6a-a784-417d-8ff4-9c8881124f89
    SMTP_NAME=VLLSchool
    SMTP_FROM=noreply@vllschool.com
    SMTP_TEMPLATES_DIR="$( cd "$(dirname "$0")" ; pwd -P )/daemons/msg-email/templates/templates"

    eval "PGDATABASE=$PGDATABASE PGUSER=$PGUSER PGPASSWORD_FILE=$PGPASSWORD_FILE SMTP_SERVER=$SMTP_SERVER SMTP_PORT=$SMTP_PORT SMTP_USER=$SMTP_USER SMTP_PASSWORD=$SMTP_PASSWORD SMTP_NAME=$SMTP_NAME SMTP_FROM=$SMTP_FROM SMTP_TEMPLATES_DIR=$SMTP_TEMPLATES_DIR go run -mod=vendor ./daemons/msg-email"
    ;;
  *)
    echo "Error first argument" >&2
    exit 1
    ;;
esac

