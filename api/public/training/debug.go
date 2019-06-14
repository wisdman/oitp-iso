package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/service"

	"github.com/wisdman/oitp-isov/api/public/training/icons"
	"github.com/wisdman/oitp-isov/api/public/training/trainers"
)

const RELAX_COUNT = 5

func (api *API) Debug(w http.ResponseWriter, r *http.Request) {
	var trainersList = []trainers.ITrainer{
		"words-questions-waste",
	}

	var configs []interface{}
	var err error
	ctx := icons.New(r.Context())
	training := newTraining(1800)

	for i, max := 0, len(trainersList); i < max; i++ {
		configs, ctx, err = trainers.Build(ctx, trainersList[i])
		if err != nil {
			service.Fatal(w, err)
			return
		}
		training.Trainers = append(training.Trainers, configs...)
	}

	service.ResponseJSON(w, training)
}
