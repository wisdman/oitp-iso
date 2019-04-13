package main

import (
	"net/http"
	"time"

	"github.com/jackc/pgx"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

func Logout(w http.ResponseWriter, r *http.Request) {
	sql := db.Conn(r)
	sessionID := service.GetSession(r)

	_, err := sql.Exec("SELECT public.user__logout_by_session($1)", sessionID)
	if err != nil && err != pgx.ErrNoRows {
		service.Fatal(w, err)
		return
	}

	service.SetSession(w, sessionID, time.Unix(0, 0))
	w.WriteHeader(http.StatusOK)
}
