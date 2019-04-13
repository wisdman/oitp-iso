package service

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

type Service struct {
	chi.Router
	Server *http.Server
}

func New() *Service {

	service := &Service{Router: chi.NewRouter()}

	service.Use(middleware.GetHead)
	service.Use(middleware.StripSlashes)
	service.Use(middleware.RequestID)
	service.Use(SessionMiddleware)
	service.Use(middleware.Logger)
	service.Use(middleware.Recoverer)
	service.Use(middleware.Timeout(10 * time.Second))

	addr := ":" + os.Getenv("PORT")
	if addr == ":" {
		addr = ":80"
	}

	service.Server = &http.Server{Addr: addr, Handler: service}

	return service
}

func (service *Service) ListenAndServe() {
	go func() {
		log.Printf("Service listening on http://0.0.0.0%s\n", service.Server.Addr)

		err := service.Server.ListenAndServe()
		if err != http.ErrServerClosed {
			log.Fatalf("Service start error: %v\n", err)
		}
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	<-stop

	err := service.Server.Shutdown(context.Background())
	if err != nil {
		log.Fatalf("Service stop error: %v\n", err)
	}

	log.Println("Service stopped")
}
