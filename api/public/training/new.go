package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

func (api *API) New(w http.ResponseWriter, r *http.Request) {
	trainingType := service.GetParam(r, "type")
	if trainingType != "debug" &&
		trainingType != "everyday" &&
		trainingType != "once" {
		service.Error(w, http.StatusBadRequest)
		return
	}

	sql := middleware.GetDBTransaction(r)

	var response []byte
	if err := sql.QueryRow(
		`SELECT public.training__new($1)`,
		trainingType,
	).Scan(&response); err != nil {
		service.Fatal(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Write(response)
}
