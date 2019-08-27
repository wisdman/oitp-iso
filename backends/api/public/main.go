package main

import (
	"github.com/wisdman/oitp-isov/backends/lib/db"
	"github.com/wisdman/oitp-isov/backends/lib/middleware"
	"github.com/wisdman/oitp-isov/backends/lib/service"
)

type API struct{}

func main() {
	db := db.New()
	api := &API{}

	srv := service.New(
		middleware.DB(db),
		middleware.IP,
	)

	srv.POST("/email-exists", api.EmailExists)

	srv.POST("/login/email", api.LoginByEmail)
	srv.POST("/login/otr", api.LoginByOTR)

	srv.POST("/invite", api.NewSelfInvite)
	srv.POST("/invite/:id", api.LoginByInvite)

	srv.ListenAndServe()
}
