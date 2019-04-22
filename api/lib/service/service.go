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
	router *Router
	server *http.Server
}

var addr string

func init() {
	addr = ":" + os.Getenv("PORT")
	if addr == ":" {
		addr = ":80"
	}
}

func New() *Service {
	service := &Service{router: NewRouter()}
	service.server = &http.Server{Addr: addr, Handler: service.router}
	return service
}

// Shortcut for service.router.Handle(method, path, handle)
func (service *Service) Handle(method, path string, handle http.HandlerFunc) {
	service.router.Handle(method, path, handle)
}

// GET is a shortcut for service.router.Handle("GET", path, handle)
func (service *Service) GET(path string, handle http.HandlerFunc) {
	service.router.Handle("GET", path, handle)
}

// HEAD is a shortcut for service.router.Handle("HEAD", path, handle)
func (service *Service) HEAD(path string, handle http.HandlerFunc) {
	service.router.Handle("HEAD", path, handle)
}

// OPTIONS is a shortcut for service.router.Handle("OPTIONS", path, handle)
func (service *Service) OPTIONS(path string, handle http.HandlerFunc) {
	service.router.Handle("OPTIONS", path, handle)
}

// POST is a shortcut for service.router.Handle("POST", path, handle)
func (service *Service) POST(path string, handle http.HandlerFunc) {
	service.router.Handle("POST", path, handle)
}

// PUT is a shortcut for service.router.Handle("PUT", path, handle)
func (service *Service) PUT(path string, handle http.HandlerFunc) {
	service.router.Handle("PUT", path, handle)
}

// PATCH is a shortcut for service.router.Handle("PATCH", path, handle)
func (service *Service) PATCH(path string, handle http.HandlerFunc) {
	service.router.Handle("PATCH", path, handle)
}

// DELETE is a shortcut for service.router.Handle("DELETE", path, handle)
func (service *Service) DELETE(path string, handle http.HandlerFunc) {
	service.router.Handle("DELETE", path, handle)
}

// Start service
func (service *Service) ListenAndServe() {
	go func() {
		log.Printf("Service listening on http://0.0.0.0%s\n", service.server.Addr)

		err := service.server.ListenAndServe()
		if err != http.ErrServerClosed {
			log.Printf("Service init error: %v\n", err)
		}
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	<-stop

	err := service.server.Shutdown(context.Background())
	if err != nil {
		log.Printf("Service shutdown error: %v\n", err)
	}

	log.Println("Service stopped")
}
