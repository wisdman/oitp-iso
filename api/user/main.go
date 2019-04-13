package main

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

func main() {
	s := service.New()
	s.Use(db.Middleware)
	s.Use(service.UserIDMiddleware)
	s.Get("/", Get)
	s.ListenAndServe()
}
