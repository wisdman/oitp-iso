package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/service"
	"github.com/wisdman/oitp-isov/api/lib/session"
)

func (api *API) GetUser(w http.ResponseWriter, r *http.Request) {
	sql, err := session.Begin(api.db, r)
	if err == session.ErrorIncorrectSessionKey || err == session.ErrorUnauthorized {
		service.Error(w, http.StatusUnauthorized)
		return
	} else if err != nil {
		service.Fatal(w, err)
		return
	}

	var user []byte
	err = sql.QueryRow(
		`SELECT "user" FROM public.users LIMIT 1`,
	).Scan(&user)
	if err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}

	if err = sql.Commit(); err != nil {
		service.Fatal(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	w.Write(user)
}
