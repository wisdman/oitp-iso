package main

import (
	"errors"
	"net"
	"net/http"

	"github.com/wisdman/oitp-isov/backends/lib/middleware"
	"github.com/wisdman/oitp-isov/backends/lib/service"
)

func (api *API) LoginByOTR(w http.ResponseWriter, r *http.Request) {
	var body struct {
		ID          string      `json:"id"`
		IP          net.IP      `json:"ip"`
		Fingerprint interface{} `json:"fingerprint"`
	}

	if err := service.DecodeJSONBody(r, &body); err != nil || body.ID == "" {
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
		`SELECT * FROM public.login_by_otr($1, $2, $3)`,
		body.ID,
		body.IP,
		body.Fingerprint,
	).Scan(&response); err != nil {
		service.Fatal(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Write(response)
}
