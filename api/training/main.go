package main

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type API struct {
	db *db.DB
}

func main() {
	db := db.New()
	api := &API{db}
	srv := service.New()

	srv.GET("/debug", api.Debug)
	srv.GET("/everyday", api.Everyday)
	srv.GET("/once", api.Once)

	srv.ListenAndServe()
}
