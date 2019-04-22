package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/service"
)

func (api *API) Auth(w http.ResponseWriter, r *http.Request) {
	sql, err := api.db.Acquire()
	if err != nil {
		service.Fatal(w, err)
		return
	}

	userID, _, err := getUser(sql, r)
	if err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}

	if userID == "" {
		service.Error(w, http.StatusUnauthorized)
		sql.Rollback()
		return
	}

	if err = sql.Commit(); err != nil {
		service.Fatal(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
