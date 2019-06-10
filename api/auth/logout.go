package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

func (api *API) Logout(w http.ResponseWriter, r *http.Request) {
	sql := middleware.GetDBTransaction(r)

	_, err := sql.Exec("SELECT public.users__logout()")
	if err != nil {
		service.Fatal(w, err)
		return
	}

	service.Error(w, http.StatusUnauthorized)
}
