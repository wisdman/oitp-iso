package db

import (
	"github.com/jackc/pgx"
)

type Transaction struct {
	db   *DB
	conn *pgx.Conn
	tx   *pgx.Tx
}

func (transaction *Transaction) Exec(sql string, args ...interface{}) (pgx.CommandTag, error) {
	return transaction.tx.Exec(sql, args...)
}

func (transaction *Transaction) Query(sql string, args ...interface{}) (*pgx.Rows, error) {
	return transaction.tx.Query(sql, args...)
}

func (transaction *Transaction) QueryRow(sql string, args ...interface{}) *pgx.Row {
	return transaction.tx.QueryRow(sql, args...)
}

func (transaction *Transaction) Commit() error {
	err := transaction.tx.Commit()
	transaction.db.pool.Release(transaction.conn)
	return err
}

func (transaction *Transaction) Rollback() error {
	err := transaction.tx.Rollback()
	transaction.db.pool.Release(transaction.conn)
	return err
}
