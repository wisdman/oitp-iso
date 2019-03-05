#!/bin/sh
case "$1" in
  dev|prod)
    docker-compose -f docker-compose.common.yml -f docker-compose.$1.yml ${@:2}
    ;;
  *)
    echo "Error first parameter" >&2
    exit 1
    ;;
esac