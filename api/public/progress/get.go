package main

import (
	"math/rand"
	"net/http"

	// "github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

var ITEMS = [...]string{"lexicon", "arithmetic", "variability", "verbal", "harmonization", "inductance", "mnemonics", "visually-memory", "space-logic", "attention", "visually-perception", "auditory-memory", "teasing", "accuracy"}

func (api *API) GetUser(w http.ResponseWriter, r *http.Request) {
	progress := &Progress{
		Charge:       82,
		Memory:       67,
		Knowledge:    81,
		Intelligence: 30,

		Speed: []uint16{50, 60, 70, 80, 70},
	}

	for _, v := range ITEMS {
		progress.Items = append(progress.Items, &Item{
			Id: v,
			Last: []int{
				rand.Intn(40) + 45,
				rand.Intn(40) + 45,
				rand.Intn(40) + 45,
				rand.Intn(40) + 45,
				rand.Intn(40) + 45,
			},
			Average: rand.Intn(30) + 65,
		})
	}

	service.ResponseJSON(w, progress)
}
