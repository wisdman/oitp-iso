package main

import (
	"context"
	"log"

	"github.com/wisdman/oitp-isov/backends/lib/db"
	"github.com/wisdman/oitp-isov/backends/lib/smtp"
)

type SMessage struct {
	Id       string      `json:"id"`
	To       string      `json:"to"`
	ToName   string      `json:"toName"`
	Template string      `json:"template"`
	Data     interface{} `json:"data"`
	Body     string      `json:"body"`
}

func SendMessages(ctx context.Context, pool *db.DB, mailer *smtp.SMTP) {
	sql, err := pool.Begin(ctx)
	if err != nil {
		log.Printf("TRANSACTION ERROR: %+v", err)
		return
	}

	var message SMessage
	if err := sql.QueryRow(
		`SELECT "id", "to", "toName", "template", "data" FROM msg.email WHERE status = 'new' FOR UPDATE SKIP LOCKED`,
	).Scan(
		&message.Id,
		&message.To,
		&message.ToName,
		&message.Template,
		&message.Data,
	); err == db.ErrNoRows {
		sql.Rollback()
		return
	} else if err != nil {
		sql.Rollback()
		log.Printf("SELECT ERROR: %+v", err)
		return
	}

	if err := mailer.Send(message.Template, message.To, message.ToName, "", message.Data); err != nil {
		sql.Rollback()
		log.Printf("MAILER ERROR: %+v", err)
		return
	}

	if _, err := sql.Exec(
		`UPDATE msg.email SET status = 'sended' WHERE id = $1`,
		message.Id,
	); err != nil {
		sql.Rollback()
		log.Printf("UPDATE ERROR: %+v", err)
	}

	if err := sql.Commit(); err != nil {
		log.Printf("COMMIT ERROR: %+v\n", err)
	}
}
