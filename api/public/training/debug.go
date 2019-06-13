package main

import (
	"math/rand"
	"net/http"
	"time"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"

	"github.com/wisdman/oitp-isov/api/public/training/trainers"
)

const RELAX_COUNT = 5

func (api *API) Debug(w http.ResponseWriter, r *http.Request) {
	rand.Seed(time.Now().UnixNano())

	var trainersList = []trainers.ITrainer{
		"words-questions-waste",
	}

	sql := middleware.GetDBTransaction(r)

	training := newTraining(1800)

	for i, max := 0, len(trainersList); i < max; i++ {
		configs, err := trainers.Build(sql, trainersList[i], 0)
		if err != nil {
			service.Fatal(w, err)
			return
		}
		training.Trainers = append(training.Trainers, configs...)
	}

	service.ResponseJSON(w, training)
}
