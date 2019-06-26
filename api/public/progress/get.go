package main

import (
	// "math/rand"
	"net/http"

	// "github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

var ITEMS = [...]string{"lexicon", "arithmetic", "variability", "verbal", "harmonization", "inductance", "mnemonics", "visually-memory", "space-logic", "attention", "visually-perception", "auditory-memory", "teasing", "accuracy"}

func (api *API) Get(w http.ResponseWriter, r *http.Request) {
	progress := &Progress{
		Charge: 72,

		Memory:       50,
		Knowledge:    50,
		Intelligence: 50,

		Speed: []uint16{50, 50, 50, 50, 50},
	}

	for _, v := range ITEMS {
		progress.Items = append(progress.Items, &Item{
			Id:      v,
			Last:    []int{50, 50, 50, 50},
			Average: 0,
		})
	}

	service.ResponseJSON(w, progress)
}
