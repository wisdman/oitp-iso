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

	srv.PUT("/login/otr", api.LoginNewOTR)
	srv.POST("/login/otr", api.LoginByOTR)

	srv.PUT("/login/invite", api.LoginNewInvite)
	srv.POST("/login/invite", api.LoginByInvite)

	srv.ListenAndServe()
}
