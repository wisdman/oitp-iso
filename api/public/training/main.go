package main

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type API struct{}

func main() {
	db := db.New()
	api := &API{}

	srv := service.New(
		middleware.DB(db),
		middleware.IP,
		middleware.Auth,
	)

	srv.GET("/debug", api.Debug)
	srv.GET("/everyday", api.Everyday)
	srv.GET("/once", api.Once)

	srv.ListenAndServe()
}
