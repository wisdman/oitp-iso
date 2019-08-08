package main

import (
	"net"
	"net/http"

	"github.com/jackc/pgx"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type Invite struct {
	ID          string      `json:"id"`
	IP          net.IP      `json:"ip"`
	Fingerprint interface{} `json:"fingerprint"`
}

func (api *API) Login(w http.ResponseWriter, r *http.Request) {
	sql := middleware.GetDBTransaction(r)

	var invite Invite
	err := service.DecodeJSONBody(r, &invite)
	if err != nil || invite.ID == "" {
		service.Error(w, http.StatusUnauthorized)
		return
	}

	invite.IP = middleware.GetIP(r)
	if invite.IP == nil {
		service.Error(w, http.StatusUnauthorized)
		return
	}

	var session Session
	err = sql.QueryRow(
		`SELECT * FROM public.login_by_invite($1, $2, $3)`,
		invite.ID,
		invite.IP,
		invite.Fingerprint,
	).Scan(
		&session.Id,
		&session.Expires,
	)

	if err == pgx.ErrNoRows {
		service.Error(w, http.StatusUnauthorized)
		return
	} else if err != nil {
		service.Fatal(w, err)
		return
	}

	service.ResponseJSON(w, session)
}
