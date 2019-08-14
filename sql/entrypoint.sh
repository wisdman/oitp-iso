#!/bin/sh

set -e

if [ "$1" = 'postgres' ]; then

  # Prepare PGDATA directory
  mkdir -p "$PGDATA"
  chown -R postgres "$PGDATA"
  chmod 700 "$PGDATA"

  # Prepare socket directory
  mkdir -p /var/run/postgresql
  chown -R postgres /var/run/postgresql
  chmod 775 /var/run/postgresql

  PG_VERSION=$(pg_config --version)
  PG_MAJOR=$(echo $PG_VERSION | sed -nre 's/^[^0-9]*([0-9]+).*/\1/p')

  # check PostgreSQL data directory
  if [ ! -s "$PGDATA/PG_VERSION" ]; then
    echo
    echo "PostgreSQL $PG_VERSION init database process in $PGDATA"
    echo

    # Init database with random superuser password
    dd if=/dev/urandom bs=1 count=2048 | sha256sum | base64 > /tmp/pass
    eval 'su-exec postgres initdb --username="$PGUSER" --pwfile="/tmp/pass" --data-checksums'
    rm /tmp/pass

    su-exec postgres pg_ctl -D "$PGDATA" -o "-c listen_addresses='localhost'" -w start

    PSQL="psql -v ON_ERROR_STOP=1 --username=$PGUSER"

    if [ "$PGDATABASE" != 'postgres' ]; then
      eval "$PSQL --dbname=postgres -c 'CREATE DATABASE \"$PGDATABASE\"'"
      echo
    fi

    PSQL="$PSQL --dbname=$PGDATABASE"

    for f in `find /initdb.d -type f | sort`; do
      case "$f" in
        *.sh)     echo "$0: running $f"; . "$f" ;;
        *.sql)    echo "$0: running $f"; eval "$PSQL < $f"; echo ;;
        *)        echo "$0: ignoring $f" ;;
      esac
    done

    su-exec postgres pg_ctl -D "$PGDATA" -m fast -w stop

    echo
    echo "PostgreSQL $PG_VERSION init process complete"
    echo
  fi

  if [[ $(cat "$PGDATA/PG_VERSION") != "$PG_MAJOR" ]]; then
    echo "ERROR: Incompatible database files version in $PGDATA"
    exit 1
  fi

  echo $PG_VERSION
  exec su-exec postgres "$@"

fi

exec "$@"
