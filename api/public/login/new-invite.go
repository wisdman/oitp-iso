package main

import (
	"net/http"

	"github.com/jackc/pgx"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type NewInvite struct {
	Email string `json:"email"`
}

func (api *API) NewInvite(w http.ResponseWriter, r *http.Request) {
	var invite NewInvite
	err := service.DecodeJSONBody(r, &invite)
	if err != nil || invite.Email == "" {
		service.Error(w, http.StatusBadRequest)
		return
	}

	sql := middleware.GetDBTransaction(r)

	var alreadyExists bool
	err = sql.QueryRow(
		`SELECT public.new_invite($1)`,
		invite.Email,
	).Scan(&alreadyExists)

	if err != nil && err != pgx.ErrNoRows {
		service.Fatal(w, err)
		return
	}

	if alreadyExists {
		service.Error(w, http.StatusConflict)
		return
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
}
