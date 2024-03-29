package middleware

import (
	"context"
	"log"
	"net/http"

	"github.com/jackc/pgx"

	"github.com/wisdman/oitp-isov/backends/lib/db"
	"github.com/wisdman/oitp-isov/backends/lib/service"
)

type ctxTransactionKeyType int

const TransactionKey ctxTransactionKeyType = 0

type statusWriter struct {
	http.ResponseWriter
	status int
}

func (w *statusWriter) WriteHeader(status int) {
	w.status = status
	w.ResponseWriter.WriteHeader(status)
}

func (w *statusWriter) Write(b []byte) (int, error) {
	if w.status == 0 {
		w.status = http.StatusOK
	}
	return w.ResponseWriter.Write(b)
}

func DB(pool *db.DB) func(fn http.HandlerFunc) http.HandlerFunc {
	return func(handle http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			sql, err := pool.Begin(r.Context())
			if err != nil {
				service.Fatal(w, err)
				return
			}

			sw := statusWriter{ResponseWriter: w}

			defer func() {
				if sql.Status() != pgx.TxStatusInProgress {
					return
				}

				if sw.status >= 400 {
					if err := sql.Rollback(); err != nil {
						log.Printf("FATAL ROLLBACK: %+v\n", err)
					}
					return
				}

				if err := sql.Commit(); err != nil {
					log.Printf("FATAL COMMIT: %+v\n", err)
				}
			}()

			ctx := r.Context()
			ctx = context.WithValue(ctx, TransactionKey, sql)
			r = r.WithContext(ctx)

			handle(&sw, r)
		}
	}
}

func GetDBTransactionFromContext(ctx context.Context) *db.Transaction {
	if sql, ok := ctx.Value(TransactionKey).(*db.Transaction); ok {
		return sql
	}
	panic("Transaction middleware isn't initialized")
}

func GetDBTransaction(r *http.Request) *db.Transaction {
	return GetDBTransactionFromContext(r.Context())
}

func GetDBErrorCode(err error) string {
	return err.(pgx.PgError).Code
}
