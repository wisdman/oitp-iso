package main

import (
	"encoding/json"
	"net/http"
	// "github.com/wisdman/oitp-isov/api/lib/service"
	// "github.com/wisdman/oitp-isov/api/training/trainers"
)

func (api *API) GetUser(w http.ResponseWriter, r *http.Request) {
	user := &User{
		Name: "Лидия Васильева",

		Premium: 30,

		Charge:       50,
		Intelligence: 50,
		Knowledge:    50,
		Memory:       50,

		Speed: []uint{50, 50, 50, 50},
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}
