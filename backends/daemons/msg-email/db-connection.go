package main

import (
	"github.com/jackc/pgx"
)

// PGHOST
// PGPORT
// PGDATABASE
// PGUSER
// PGPASSWORD
// PGSSLMODE
// PGSSLCER
// PGSSLKEY
// PGSSLROOTCERT
// PGAPPNAME
// PGCONNECT_TIMEOUT
// PGTARGETSESSIONATTRS

func NewDBConnection() (*pgx.Conn, error) {
	config, err := pgx.ParseEnvLibpq()
	if err != nil {
		return nil, err
	}

	config.Logger = &DBLogger{}

	return pgx.Connect()
}
