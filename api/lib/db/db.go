package db

import (
	"context"
	"log"

	"github.com/jackc/pgx"
)

type DB struct {
	*pgx.ConnPool
}

func New() *DB {
	poolConfig, err := parseEnv()
	if err != nil {
		log.Fatalln(err)
	}

	ConnPool, err := pgx.NewConnPool(*poolConfig)
	if err != nil {
		log.Fatalln(err)
	}

	return &DB{ConnPool}
}

func (db *DB) Exec(ctx context.Context, sql string, args ...interface{}) (pgx.CommandTag, error) {
	return db.ExecEx(ctx, sql, nil, args...)
}

func (db *DB) Query(ctx context.Context, sql string, args ...interface{}) (*pgx.Rows, error) {
	return db.QueryEx(ctx, sql, nil, args...)
}

func (db *DB) QueryRow(ctx context.Context, sql string, args ...interface{}) *pgx.Row {
	return db.QueryRowEx(ctx, sql, nil, args...)
}

func (db *DB) Begin(ctx context.Context) (*Transaction, error) {
	Tx, err := db.BeginEx(ctx, &pgx.TxOptions{IsoLevel: pgx.ReadCommitted})
	if err != nil {
		return nil, err
	}

	return &Transaction{Tx, ctx}, nil
}
