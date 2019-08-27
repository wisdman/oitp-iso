package main

import (
	"log"

	"github.com/jackc/pgx"
)

type DBLogger struct{}

func (service *DBLogger) Log(level pgx.LogLevel, msg string, data map[string]interface{}) {
	log.Printf("SQL %s: %s %+v\n", level.String(), msg, data)
}
