package main

import (
	"math/rand"
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"

	"github.com/wisdman/oitp-isov/api/public/training/icons"
	"github.com/wisdman/oitp-isov/api/public/training/trainers"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

func (api *API) Once(w http.ResponseWriter, r *http.Request) {
	var trainersList = []abstract.ITrainer{
		"matrix-filling-pattern", "matrix-filling-unique", "matrix-sequence-random",
	}

	ctx := icons.New(r.Context())
	training := newOnceTraining()

	configs, ctx, err := trainers.Build(ctx, trainersList[rand.Intn(len(trainersList))])
	if err != nil {
		service.Fatal(w, err)
		return
	}
	training.Trainers = append(training.Trainers, configs...)

	sql := middleware.GetDBTransactionFromContext(ctx)
	if err := sql.QueryRow(`
    INSERT INTO public.self_training (
			"type", "timeLimit", "trainers"
    ) VALUES ( $1, $2, $3 ) RETURNING "id"`,
		training.Type,
		training.TimeLimit,
		training.Trainers,
	).Scan(&training.UUID); err != nil {
		service.Fatal(w, err)
		return
	}

	service.ResponseJSON(w, training)
}
