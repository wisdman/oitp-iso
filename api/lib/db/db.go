package db

import (
  "github.com/jackc/pgx"
)

type DB struct {
  pgx.ConnPool
}

func New() (*DB, error) {
  config, err := ParseEnvConfig()
  if err != nil {
    return nil, err
  }

  db, err := pgx.NewConnPool(*config)
  if err != nil {
    return nil, err
  }

  return &DB{*db}, nil
}