package main

import (
	"net/http"

	// "github.com/jackc/pgx"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type Invite struct {
	Email string `json:"email"`
}

func (api *API) Invite(w http.ResponseWriter, r *http.Request) {
	var invite Invite
	err := service.DecodeJSONBody(r, &invite)
	if err != nil || invite.Email == "" {
		service.Error(w, http.StatusBadRequest)
		return
	}

	sql := middleware.GetDBTransaction(r)

	_, err = sql.Exec(
		`SELECT public.new_invite($1)`,
		invite.Email,
	)

	if err != nil {
		service.Fatal(w, err)
		return
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
}
