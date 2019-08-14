FROM alpine:3.10 AS pgsql-builder

ENV LANG en_US.utf8

ENV PG_MAJOR 11
ENV PG_VERSION 11.5
ENV PG_SHA256 7fdf23060bfc715144cbf2696cf05b0fa284ad3eb21f0c378591c6bca99ad180

RUN set -ex \
###
 && : "------- Install build dependencies -------" \
 && apk update \
 && apk add --no-cache --virtual .build-deps \
      bison \
      ca-certificates \
      clang \
      coreutils \
      dpkg-dev dpkg \
      flex \
      g++ \
      gcc \
      icu-dev \
      libc-dev \
      libedit-dev \
      linux-headers \
      llvm8 \
      llvm8-dev \
      make \
      openssl \
      openssl-dev \
      perl-ipc-run \
      perl-utils \
      tar \
      util-linux-dev \
      zlib-dev \
###
 && : "------- Fetch PostgreSQL source code -------" \
 && wget -O postgresql.tar.bz2 "https://ftp.postgresql.org/pub/source/v$PG_VERSION/postgresql-$PG_VERSION.tar.bz2" \
 && echo "$PG_SHA256 *postgresql.tar.bz2" | sha256sum -c - \
 && mkdir -p /usr/src/postgresql \
 && tar --extract --file postgresql.tar.bz2 --directory /usr/src/postgresql --strip-components 1 \
 && rm postgresql.tar.bz2 \
 && cd /usr/src/postgresql \
###
 && : "------- Update DEFAULT_PGSOCKET_DIR to /var/run/postgresql -------" \
 && awk '$1 == "#define" && $2 == "DEFAULT_PGSOCKET_DIR" && $3 == "\"/tmp\"" { $3 = "\"/var/run/postgresql\""; print; next } { print }' src/include/pg_config_manual.h > src/include/pg_config_manual.h.new \
 && grep '/var/run/postgresql' src/include/pg_config_manual.h.new \
 && mv src/include/pg_config_manual.h.new src/include/pg_config_manual.h \
###
 && : "------- Prepare GNU environment -------" \
 && gnuArch="$(dpkg-architecture --query DEB_BUILD_GNU_TYPE)" \
 && wget -O config/config.guess 'https://git.savannah.gnu.org/cgit/config.git/plain/config.guess?id=7d3d27baf8107b630586c962c057e22149653deb' \
 && wget -O config/config.sub 'https://git.savannah.gnu.org/cgit/config.git/plain/config.sub?id=7d3d27baf8107b630586c962c057e22149653deb' \
###
 && : "------- Configure PostgreSQL build -------" \
 && ./configure \
      --build="$gnuArch" \
      --prefix=/usr/local \
      --with-includes=/usr/local/include \
      --with-libraries=/usr/local/lib \
      --with-system-tzdata=/usr/share/zoneinfo \
      --with-pgport=5432 \
      --disable-rpath \
      --enable-tap-tests \
      --enable-thread-safety \
      --with-gnu-ld \
      --with-icu \
      --with-llvm \
      --with-openssl \
      --with-uuid=e2fs \
###
 && : "------- Building and Install PostgreSQL -------" \
 && make -j "$(nproc)" world \
 && make install-world \
 && make -C contrib install \
###
 && : "------- Unnnstall build dependencies -------" \
 && apk del .build-deps \
###
 && : "------- Remove src and share files -------" \
 && cd /; rm -rf \
            /usr/src/postgresql  \
            /usr/local/share/doc \
            /usr/local/share/man \
 && find /usr/local -name '*.a' -delete


FROM golang:1-alpine AS walg-builder

COPY --from=pgsql-builder /usr/local /usr/local

ENV LANG en_US.utf8

ENV WALG_VERSION 0.2.10a
ENV WALG_SHA256 267de92c57e5f22691defcc1657f911dfd084ab9cada7509b011a8cfcca998af
ENV WALG_REVISION 55cc5d1

RUN set -ex \
###
 && : "------- Install build dependencies -------" \
 && apk add --no-cache --virtual .build-deps \
      bash \
      binutils \
      brotli-dev \
      cmake \
      gcc \
      git \
      make \
      musl-dev \
###
 && : "------- Fetch WAL-G source code -------" \
 && wget -O wal-g.tar.gz https://github.com/wal-g/wal-g/archive/v$WALG_VERSION.tar.gz \
 && echo "$WALG_SHA256 *wal-g.tar.gz" | sha256sum -c - \
 && mkdir -p $GOPATH/src/github.com/wal-g/wal-g \
 && tar --extract --file wal-g.tar.gz --directory $GOPATH/src/github.com/wal-g/wal-g --strip-components 1 \
 && rm wal-g.tar.gz \
 && cd $GOPATH/src/github.com/wal-g/wal-g \
 && git clone  https://github.com/google/brotli.git submodules/brotli \
###
 && : "------- Building and Install WAL-G -------" \
 && go get -u github.com/golang/dep/cmd/dep \
 && go get -u golang.org/x/lint/golint \
 && dep ensure \
 && ./link_brotli.sh \
 && cd main/pg \
 && go build -o wal-g -ldflags "-s -w -X github.com/wal-g/wal-g/cmd/pg.BuildDate=`date -u +%Y.%m.%d_%H:%M:%S` -X github.com/wal-g/wal-g/cmd/pg.GitRevision=$WALG_REVISION -X github.com/wal-g/wal-g/cmd/pg.WalgVersion=v$WALG_VERSION" \
 && mv wal-g /usr/local/bin/wal-g \
###
 && : "------- Unnnstall build dependencies -------" \
 && apk del .build-deps \
###
 && : "------- Remove src and share files -------" \
 && cd /; rm -rf $GOPATH/src/*


FROM alpine:3.10

COPY --from=pgsql-builder /usr/local /usr/local
COPY --from=walg-builder /usr/local/bin/wal-g /usr/local/bin/wal-g

ENV LANG en_US.utf8

ENV PGDATA /var/lib/postgresql/data
ENV PGUSER root
ENV PGDATABASE postgres

RUN set -ex \
###
 && : "------- Install runtime dependencies -------" \
 && apk add --no-cache \
      icu-libs \
      libcrypto1.1 \
      libedit \
      libssl1.1 \
      libuuid \
      musl \
      pspg \
      su-exec \
      tzdata \
      zlib \
###
 && : "------- Configure postgres user -------" \
 && postgresHome="$(getent passwd postgres)"; \
    postgresHome="$(echo "$postgresHome" | cut -d: -f6)" \
 && mkdir -p "$postgresHome" \
 && chown -R postgres:postgres "$postgresHome" \
###
 && : "------- Prepare socket directory -------" \
 && mkdir -p /var/run/postgresql \
 && chown -R postgres:postgres /var/run/postgresql \
 && chmod 2777 /var/run/postgresql \
###
 && : "------- Prepare PGDATA directory -------" \
 && mkdir -p "$PGDATA" \
 && chown -R postgres:postgres "$PGDATA" \
 && chmod 777 "$PGDATA" \
###
 && : "------- Prepare initdb.d directory -------" \
 && mkdir -p /initdb.d \
 && chown -R postgres:postgres /initdb.d \
 && chmod 777 /initdb.d

COPY .psqlrc /root/.psqlrc
COPY entrypoint.sh /usr/local/bin/
COPY pg_hba.conf /usr/local/share/postgresql/pg_hba.conf.sample
COPY postgresql.conf /usr/local/share/postgresql/postgresql.conf.sample

COPY initdb.d /initdb.d

ENTRYPOINT ["entrypoint.sh"]

VOLUME /var/lib/postgresql/data
EXPOSE 5432

CMD ["postgres"]
