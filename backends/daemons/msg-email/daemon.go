package main

import (
	"context"
	"fmt"

	"github.com/jackc/pgx"
)

func Daemon(ctx context.Context) (err error) {
	conn, err := NewDBConnection()
	if err != nil {
		return err
	}
	defer conn.Close()

	conn.Listen("MSG_EMAIL")

	for {
		notification, err := conn.WaitForNotification(ctx)
		if err != nil {
			return err
		}

		fmt.Println("PID:", notification.PID, "Channel:", notification.Channel, "Payload:", notification.Payload)
	}
}
