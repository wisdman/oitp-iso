package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

func (api *API) Auth(w http.ResponseWriter, r *http.Request) {
	sql := middleware.GetDBTransaction(r)

	ip := middleware.GetIP(r)
	if ip == nil {
		service.Error(w, http.StatusUnauthorized)
		return
	}

	rows, err := sql.Query("UPDATE public.sessions SET ip = $1 RETURNING true", ip)
	if err != nil {
		service.Fatal(w, err)
		return
	}
	defer rows.Close()

	if !rows.Next() {
		service.Error(w, http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
}
