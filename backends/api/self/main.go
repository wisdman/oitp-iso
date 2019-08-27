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
		middleware.Auth,
	)

	srv.GET("/", api.Logout)

	srv.GET("/user", api.GetUser)
	srv.POST("/user", api.SetUserData)

	srv.POST("/training/:type", api.NewTraining)
	srv.PUT("/training/:id", api.FinishTraining)

	srv.GET("/progress", api.GetProgress)

	srv.GET("/blackboard", api.GetBlackboard)

	srv.ListenAndServe()
}
