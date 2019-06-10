package db

import (
	"context"

	"github.com/jackc/pgx"
)

type Transaction struct {
	*pgx.Tx
	ctx context.Context
}

func (transaction *Transaction) Exec(sql string, args ...interface{}) (pgx.CommandTag, error) {
	return transaction.ExecEx(transaction.ctx, sql, nil, args...)
}

func (transaction *Transaction) Query(sql string, args ...interface{}) (*pgx.Rows, error) {
	return transaction.QueryEx(transaction.ctx, sql, nil, args...)
}

func (transaction *Transaction) QueryRow(sql string, args ...interface{}) *pgx.Row {
	return transaction.QueryRowEx(transaction.ctx, sql, nil, args...)
}

func (transaction *Transaction) Commit() error {
	return transaction.CommitEx(transaction.ctx)
}

func (transaction *Transaction) Rollback() error {
	return transaction.RollbackEx(transaction.ctx)
}
