package main

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"time"

	"github.com/wisdman/oitp-isov/api/lib/service"

	"github.com/wisdman/oitp-isov/api/training/trainers"
)

func (api *API) Once(w http.ResponseWriter, r *http.Request) {
	rand.Seed(time.Now().UnixNano())

	var trainersList = []trainers.ITrainer{
		"matrix-filling-random", "matrix-sequence-random",
	}

	rand.Shuffle(len(trainersList), func(i, j int) {
		trainersList[i], trainersList[j] = trainersList[j], trainersList[i]
	})

	sql, err := api.db.Acquire()
	if err != nil {
		service.Fatal(w, err)
		return
	}

	training := newTraining(1800)
	var configs []interface{}

	for i, max := 0, len(trainersList); i < max; i++ {
		if configs, err = trainers.Build(sql, trainersList[i], uint8(rand.Intn(2))); err != nil {
			service.Fatal(w, err)
			sql.Rollback()
			return
		}
		training.Trainers = append(training.Trainers, configs...)
	}

	if err = sql.Commit(); err != nil {
		service.Fatal(w, err)
		return
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(training)
}
