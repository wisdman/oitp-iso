package db

import (
	"log"

	"github.com/jackc/pgx"
)

type DB struct {
	pool *pgx.ConnPool
}

func New() *DB {
	config, err := pgx.ParseEnvLibpq()
	if err != nil {
		log.Fatalln(err)
	}

	config.Logger = &DBLogger{}
	config.LogLevel = pgx.LogLevelError
	// config.LogLevel = pgx.LogLevelInfo

	pool, err := pgx.NewConnPool(pgx.ConnPoolConfig{ConnConfig: config})
	if err != nil {
		log.Fatalln(err)
	}

	return &DB{pool}
}

func (db *DB) Acquire() (*Transaction, error) {
	conn, err := db.pool.Acquire()
	if err != nil {
		return nil, err
	}

	tx, err := conn.Begin()
	if err != nil {
		db.pool.Release(conn)
		return nil, err
	}

	return &Transaction{db, conn, tx}, nil
}
