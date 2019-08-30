#!/bin/sh

SECRETS=("api-admin" "api-payment" "api-public" "api-self" "daemon-cron" "daemon-msg" "daemon-payment")
for s in "${SECRETS[@]}"; do
  if [ ! -s "secret-$s.env" ]; then
    printf "$(openssl rand -base64 32)" > secret-$s.env
  fi
done
