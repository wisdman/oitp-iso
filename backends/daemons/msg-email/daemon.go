package main

import (
	"context"
	"log"
	"time"

	"github.com/wisdman/oitp-isov/backends/lib/db"
	"github.com/wisdman/oitp-isov/backends/lib/smtp"
)

const RECHECK_TIMEOUT = 10 * time.Second

func Daemon(ctx context.Context) (err error) {
	pool := db.New()
	defer pool.Close()

	mailer := smtp.New()

	conn, err := pool.Acquire()
	if err != nil {
		return err
	}

	err = conn.Listen("msg_email")
	if err != nil {
		return err
	}
	defer conn.Unlisten("msg_email")

	dbNotification := make(chan uint32)

	go func() {
		for {
			notification, err := conn.WaitForNotification(ctx)
			if err != nil {
				if err.Error() != "context canceled" {
					log.Printf("NOTIFICATION ERROR: %+v", err)
				}
				continue
			}
			dbNotification <- notification.PID
		}
	}()

	ticker := time.NewTicker(RECHECK_TIMEOUT)

	for {
		select {
		case <-ticker.C:
			go SendMessages(ctx, pool, mailer)
		case <-dbNotification:
			go SendMessages(ctx, pool, mailer)
		case <-ctx.Done():
			ticker.Stop()
			return nil
		}
	}
}
