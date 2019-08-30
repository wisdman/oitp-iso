package main

import (
	"github.com/wisdman/oitp-isov/backends/lib/db"
	"github.com/wisdman/oitp-isov/backends/lib/middleware"
	"github.com/wisdman/oitp-isov/backends/lib/service"
	"github.com/wisdman/oitp-isov/backends/lib/tinkoff"
)

type API struct {
	tinkoff *tinkoff.Client
}

func main() {
	db := db.New()

	api := &API{tinkoff: tinkoff.New()}

	srv := service.New(
		middleware.DB(db),
		middleware.IP,
		// middleware.Auth,
	)

	srv.GET("/", api.GetPayments)
	// srv.PUT("/", api.NewPayment)

	srv.ListenAndServe()
}
