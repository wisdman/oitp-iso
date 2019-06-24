package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/service"
)

func (api *API) Result(w http.ResponseWriter, r *http.Request) {
	configs := make([]interface{}, 10)
	service.ResponseJSON(w, configs)
}
