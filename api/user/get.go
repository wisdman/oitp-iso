package main

import (
	// "log"
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

func Get(w http.ResponseWriter, r *http.Request) {
	user := service.GetUserID(r)
	sql := db.Conn(r)

	service.ResponseText(w, user)
}
