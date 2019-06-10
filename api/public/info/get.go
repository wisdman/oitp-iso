package main

import (
	"encoding/json"
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/service"
)

func (api *API) Get(w http.ResponseWriter, r *http.Request) {

	info := newInfo(Text)

	err := api.db.QueryRow(
		r.Context(),
		`SELECT
       "data"
     FROM public.expressions
     ORDER BY random()
     LIMIT 1`,
	).Scan(&info.Data)
	if err != nil {
		service.Fatal(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(info)
}
