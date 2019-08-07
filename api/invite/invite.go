package main

import (
	"net/http"

	// "github.com/jackc/pgx"

	// "github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

func (api *API) Invite(w http.ResponseWriter, r *http.Request) {

	id := service.GetParam(r, "id")

	service.ResponseText(w, &id)
}
