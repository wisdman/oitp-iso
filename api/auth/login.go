package main

import (
	"net"
	"net/http"

	"github.com/jackc/pgx"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type Login struct {
	Email       string      `json:"email"`
	Password    string      `json:"password"`
	IP          net.IP      `json:"ip"`
	Fingerprint interface{} `json:"fingerprint"`
}

type Session struct {
	Id      string `json:"id"`
	Expires string `json:"expires"`
}

func (api *API) Login(w http.ResponseWriter, r *http.Request) {
	sql := middleware.GetDBTransaction(r)

	var login Login
	err := service.DecodeJSONBody(r, &login)
	if err != nil || login.Email == "" || login.Password == "" {
		service.Error(w, http.StatusUnauthorized)
		return
	}

	login.IP = middleware.GetIP(r)
	if login.IP == nil {
		service.Error(w, http.StatusUnauthorized)
		return
	}

	var session Session
	err = sql.QueryRow(
		`SELECT * FROM public.users__email_login($1, $2, $3, $4)`,
		login.Email,
		login.Password,
		login.IP,
		login.Fingerprint,
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
