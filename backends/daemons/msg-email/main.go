package main

import (
	"context"
	"log"

	"github.com/jackc/pgx"
)

func main() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)

	ctx, cancel := context.WithCancel(context.Background())
	go func() {
		oscall := <-c
		log.Printf("System call:%+v", oscall)
		cancel()
	}()

	if err := Daemon(ctx); err != nil {
		log.Fatalln(err)
	}
}
