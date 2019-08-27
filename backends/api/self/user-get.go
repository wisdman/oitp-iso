package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/backends/lib/middleware"
	"github.com/wisdman/oitp-isov/backends/lib/service"
)

func (api *API) GetUser(w http.ResponseWriter, r *http.Request) {
	sql := middleware.GetDBTransaction(r)

	var response []byte
	if err := sql.QueryRow(`SELECT "user" FROM self.user`).Scan(&response); err != nil {
		service.Fatal(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Write(response)
}
