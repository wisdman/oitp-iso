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

	srv.WITH(middleware.Auth).GET("/", api.Auth)

	srv.PUT("/invite", api.NewInvite)

	srv.POST("/email", api.LoginByEmail)
	srv.POST("/invite", api.LoginByInvite)
	srv.POST("/otr", api.LoginByOTR)

	srv.WITH(middleware.Auth).DELETE("/", api.Logout)

	srv.ListenAndServe()
}
