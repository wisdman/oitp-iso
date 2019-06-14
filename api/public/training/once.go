package main

import (
	"math/rand"
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/service"

	"github.com/wisdman/oitp-isov/api/public/training/icons"
	"github.com/wisdman/oitp-isov/api/public/training/trainers"
)

func (api *API) Once(w http.ResponseWriter, r *http.Request) {
	var trainersList = []trainers.ITrainer{
		"matrix-filling-pattern", "matrix-sequence-random",
	}

	rand.Shuffle(len(trainersList), func(i, j int) {
		trainersList[i], trainersList[j] = trainersList[j], trainersList[i]
	})

	training := newTraining(1800)

	var configs []interface{}
	var err error
	ctx := icons.New(r.Context())

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
