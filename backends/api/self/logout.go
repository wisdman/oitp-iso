package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/backends/lib/middleware"
	"github.com/wisdman/oitp-isov/backends/lib/service"
)

func (api *API) Logout(w http.ResponseWriter, r *http.Request) {
	sql := middleware.GetDBTransaction(r)

	_, err := sql.Exec("SELECT self.logout()")
	if err != nil {
		service.Fatal(w, err)
		return
	}

	service.Error(w, http.StatusUnauthorized)
}
