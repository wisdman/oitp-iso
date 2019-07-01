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

	srv.POST("/:training", api.Add)
	srv.GET("/:training", api.Get)
	srv.GET("/:training/finish", api.Finish)

	srv.ListenAndServe()
}
