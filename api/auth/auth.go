package main

import (
	"net/http"

	"github.com/jackc/pgx"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

func Auth(w http.ResponseWriter, r *http.Request) {
	sql := db.Conn(r)
	sessionID := service.GetSession(r)

	var userId string
	err := sql.QueryRow("SELECT public.user__auth_by_session($1)", sessionID).Scan(&userId)
	if err == pgx.ErrNoRows {
		service.Error(w, http.StatusUnauthorized)
		return
	} else if err != nil {
		service.Fatal(w, err)
		return
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
}
