package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/backends/lib/middleware"
	"github.com/wisdman/oitp-isov/backends/lib/service"
)

type SCheckEmail struct {
	Email string `json:"email"`
}

func (api *API) EmailExists(w http.ResponseWriter, r *http.Request) {
	var body SCheckEmail
	if err := service.DecodeJSONBody(r, &body); err != nil || body.Email == "" {
		service.Error(w, http.StatusBadRequest)
		return
	}

	sql := middleware.GetDBTransaction(r)

	var response []byte
	if err := sql.QueryRow(
		`SELECT * FROM public.is_email_exists($1)`,
		body.Email,
	).Scan(&response); err != nil {
		service.Fatal(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Write(response)
}
