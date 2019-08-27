package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/backends/lib/middleware"
	"github.com/wisdman/oitp-isov/backends/lib/service"
)

type SNewInvite struct {
	Email string `json:"email"`
}

func (api *API) NewSelfInvite(w http.ResponseWriter, r *http.Request) {
	var body SNewInvite
	if err := service.DecodeJSONBody(r, &body); err != nil || body.Email == "" {
		service.Error(w, http.StatusBadRequest)
		return
	}

	sql := middleware.GetDBTransaction(r)

	var response []byte
	if err := sql.QueryRow(
		`SELECT public.new_invite($1)`,
		body.Email,
	).Scan(&response); err != nil {
		if errCode := middleware.GetDBErrorCode(err); errCode == "A0409" {
			service.Error(w, http.StatusConflict)
			return
		}
		service.Fatal(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Write(response)
}
