package main

import (
  "log"

  "github.com/wisdman/oitp-isov/api/lib/db"
  "github.com/wisdman/oitp-isov/api/lib/service"
)

type API struct {
  DB *db.DB
}

func main() {
  DB, err := db.New()
  if err != nil {
    log.Fatal(err)
  }

  a := &API{DB}
  s := service.New()

  s.GET("/", a.Check)
  s.POST("/", a.Login)
  s.DELETE("/", a.Logout)

  s.ListenAndServe()
}
