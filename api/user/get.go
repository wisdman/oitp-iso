package main

import (
	"encoding/json"
	"net/http"
	// "github.com/wisdman/oitp-isov/api/lib/service"
	// "github.com/wisdman/oitp-isov/api/training/trainers"
)

func (api *API) GetUser(w http.ResponseWriter, r *http.Request) {
	user := &User{
		Name: "Undefined Undefined",

		Premium: 30,

		Charge:       72,
		Intelligence: 57,
		Knowledge:    43,
		Memory:       84,

		Speed: []uint{50, 62, 73, 61},
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}
