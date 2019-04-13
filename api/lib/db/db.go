package db

import (
	"context"
	"log"
	"net/http"

	"github.com/jackc/pgx"
)

var db *pgx.ConnPool

var ErrNoRows = pgx.ErrNoRows

type ctxDB int

const ctxDBKey ctxDB = 0

func init() {
	config, err := pgx.ParseEnvLibpq()
	if err != nil {
		log.Fatalf("Unable to parse environment: %v\n", err)
	}

	db, err = pgx.NewConnPool(pgx.ConnPoolConfig{ConnConfig: config})
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
}

func Middleware(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {

		conn, err := db.Acquire()
		if err != nil {
			log.Printf("DB Acquire error: %v\n", err)
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		}
		defer db.Release(conn)

		ctx := r.Context()
		ctx = context.WithValue(ctx, ctxDBKey, conn)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
	return http.HandlerFunc(fn)
}

func Conn(r *http.Request) *pgx.Conn {
	if conn, ok := r.Context().Value(ctxDBKey).(*pgx.Conn); ok {
		return conn
	}

	return nil
}
