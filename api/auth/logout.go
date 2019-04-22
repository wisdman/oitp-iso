package main

import (
	"net/http"
	"time"

	"github.com/jackc/pgx"

	"github.com/wisdman/oitp-isov/api/lib/service"
)

func (api *API) Logout(w http.ResponseWriter, r *http.Request) {
	sessionID, err := getSession(r)
	if err != nil {
		service.Fatal(w, err)
		return
	} else if sessionID == "" {
		w.WriteHeader(http.StatusOK)
		return
	}

	sql, err := api.db.Acquire()
	if err != nil {
		service.Fatal(w, err)
		return
	}

	_, err = sql.Exec("SELECT public.user__logout($1)", sessionID)
	if err != nil && err != pgx.ErrNoRows {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}

	if err = sql.Commit(); err != nil {
		service.Fatal(w, err)
		return
	}

	setSession(w, "", time.Unix(0, 0))
	w.WriteHeader(http.StatusOK)
}
