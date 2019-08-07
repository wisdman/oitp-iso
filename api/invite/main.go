package main

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
	"github.com/wisdman/oitp-isov/api/lib/smtp"
)

type API struct{}

func main() {
	db := db.New()
	smtp := smtp.New(Template)

	api := &API{}

	srv := service.New(
		middleware.DB(db),
		middleware.SMTP(smtp),
		middleware.IP,
	)

	srv.POST("/:id", api.Invite)
	srv.POST("/", api.New)
	srv.WITH(middleware.Auth).PUT("/", api.New)

	srv.ListenAndServe()
}
