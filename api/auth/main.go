package main

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

const CookieKey = "session"

func main() {
	s := service.New()
	s.Use(db.Middleware)

	s.Get("/", Auth)
	s.Post("/", Login)
	s.Delete("/", Logout)

	s.ListenAndServe()
}
