package main

import (
	"errors"
	"net"
	"net/http"

	"github.com/wisdman/oitp-isov/backends/lib/middleware"
	"github.com/wisdman/oitp-isov/backends/lib/service"
)

type SLoginEmail struct {
	Email       string      `json:"email"`
	Password    string      `json:"password"`
	IP          net.IP      `json:"ip"`
	Fingerprint interface{} `json:"fingerprint"`
}

func (api *API) LoginByEmail(w http.ResponseWriter, r *http.Request) {
	var body SLoginEmail
	if err := service.DecodeJSONBody(r, &body); err != nil || body.Email == "" || body.Password == "" {
		service.Error(w, http.StatusBadRequest)
		return
	}

	if body.IP = middleware.GetIP(r); body.IP == nil {
		service.Fatal(w, errors.New("Incorrect IP address"))
		return
	}

	sql := middleware.GetDBTransaction(r)

	var response []byte
	if err := sql.QueryRow(
		`SELECT public.login_by_email($1, $2, $3, $4)`,
		body.Email,
		body.Password,
		body.IP,
		body.Fingerprint,
	).Scan(&response); err != nil {
		if errCode := middleware.GetDBErrorCode(err); errCode == "A0406" {
			service.Error(w, http.StatusNotAcceptable)
			return
		}
		service.Fatal(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Write(response)
}
