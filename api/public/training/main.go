package main

import (
	"math/rand"
	"time"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type API struct{}

func main() {
	rand.Seed(time.Now().UnixNano())

	db := db.New()
	api := &API{}

	srv := service.New(
		middleware.DB(db),
		middleware.IP,
		middleware.Auth,
	)

	srv.GET("/everyday", api.Everyday)
	srv.GET("/once", api.Once)

	srv.POST("/result", api.Result)

	srv.ListenAndServe()
}
