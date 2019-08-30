package main

import (
	"encoding/json"
	"net/http"

	"github.com/wisdman/oitp-isov/backends/lib/middleware"
	"github.com/wisdman/oitp-isov/backends/lib/service"
)

func (api *API) EmailExists(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email string `json:"email"`
	}

	if err := service.DecodeJSONBody(r, &body); err != nil || body.Email == "" {
		service.Error(w, http.StatusBadRequest)
		return
	}

	sql := middleware.GetDBTransaction(r)

	var response struct {
		Status bool `json:"status"`
	}

	if err := sql.QueryRow(
		`SELECT public.is_email_exists($1)`,
		body.Email,
	).Scan(&response.Status); err != nil {
		service.Fatal(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
