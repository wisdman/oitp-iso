package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	ctx, shutdown := context.WithCancel(context.Background())

	go func() {
		oscall := <-stop
		log.Printf("System call: %+v", oscall)
		shutdown()
		log.Println("Daemon stopped")
	}()

	if err := Daemon(ctx); err != nil {
		log.Fatalln(err)
	}
}
