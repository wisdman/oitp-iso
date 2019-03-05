package service

import (
  "context"
  "log"
  "net/http"
  "os"
  "os/signal"
  "syscall"
)

type Service struct {
  Router
  Server *http.Server
}

func New() *Service {
  addr := ":" + os.Getenv("PORT")
  if addr == ":" {
    addr = ":80"
  }

  service := &Service{}
  service.Server = &http.Server{Addr: addr, Handler: service}

  return service
}

func (service *Service) ListenAndServe() {
  go func() {
    log.Printf("Service listening on http://0.0.0.0%s\n", service.Server.Addr)

    err := service.Server.ListenAndServe()
    if err != http.ErrServerClosed {
      log.Printf("SERVICE ERROR: %v\n", err)
    }
  }()

  stop := make(chan os.Signal, 1)
  signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
  <-stop

  err := service.Server.Shutdown(context.Background())
  if err != nil {
    log.Printf("SERVICE ERROR: %v\n", err)
  }

  log.Println("Service stopped")
}

