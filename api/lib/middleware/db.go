package middleware

import (
	"context"
	"fmt"
	"net/http"

	"github.com/jackc/pgx"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type ctxTransactionKeyType int

const TransactionKey ctxTransactionKeyType = 0

func DB(pool *db.DB) func(fn http.HandlerFunc) http.HandlerFunc {
	return func(handle http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			sql, err := pool.Begin(r.Context())
			if err != nil {
				service.Fatal(w, err)
				return
			}

			fmt.Println("QWERTY!")

			defer func() {
				fmt.Println(sql.Status())

				if sql.Status() == pgx.TxStatusInProgress {
					if err := sql.Rollback(); err != nil {
						service.Fatal(w, err)
						return
					}
				}
			}()

			ctx := r.Context()
			ctx = context.WithValue(ctx, TransactionKey, sql)
			r = r.WithContext(ctx)

			handle(w, r)
		}
	}
}

func GetDBTransaction(r *http.Request) *db.Transaction {
	if sql, ok := r.Context().Value(TransactionKey).(*db.Transaction); ok {
		return sql
	}
	panic("Transaction middleware isn't initialized")
}
