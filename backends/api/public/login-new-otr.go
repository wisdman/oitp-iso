package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/backends/lib/middleware"
	"github.com/wisdman/oitp-isov/backends/lib/service"
)

func (api *API) LoginNewOTR(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email         string `json:"email"`
		ResetPassword bool   `json:"resetPassword"`
	}

	if err := service.DecodeJSONBody(r, &body); err != nil || body.Email == "" {
		service.Error(w, http.StatusBadRequest)
		return
	}

	sql := middleware.GetDBTransaction(r)

	var response []byte
	if err := sql.QueryRow(
		`SELECT public.new_otr($1, $2)`,
		body.Email,
		body,
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
