package main

import (
	"encoding/json"
	"github.com/wisdman/oitp-isov/api/lib/service"
	"net/http"
)

func (api *API) Get(w http.ResponseWriter, r *http.Request) {

	sql, err := api.db.Acquire()
	if err != nil {
		service.Fatal(w, err)
		return
	}

	var recommendation *Recommendation
	if recommendation, err = Expression(sql); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}

	if err = sql.Commit(); err != nil {
		service.Fatal(w, err)
		return
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(recommendation)
}
