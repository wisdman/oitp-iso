package main

import (
	"net/http"

	// "github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

func (api *API) GetUser(w http.ResponseWriter, r *http.Request) {
	progress := &Progress{
		Charge:       50,
		Memory:       50,
		Knowledge:    50,
		Intelligence: 50,

		Speed: []uint16{50, 60, 70, 80, 70},
	}

	service.ResponseJSON(w, progress)
}
