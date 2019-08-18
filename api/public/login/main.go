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
	)

	srv.POST("/email/exists", api.EmailExists)

	srv.POST("/email", api.LoginByEmail)
	srv.POST("/invite/:id", api.LoginByInvite)
	srv.POST("/otr", api.LoginByOTR)
	srv.POST("/invite", api.NewInvite)

	srv.ListenAndServe()
}
