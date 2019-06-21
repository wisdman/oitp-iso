package main

import (
	"math/rand"
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/service"

	"github.com/wisdman/oitp-isov/api/public/training/icons"
	"github.com/wisdman/oitp-isov/api/public/training/trainers"
)

func (api *API) Everyday(w http.ResponseWriter, r *http.Request) {
	var trainersList = []trainers.ITrainer{
		"text-reading", "table-pipe-ru", "table-pipe-number",
	}

	var trainersRandom = [][]trainers.ITrainer{
		{"classification-colors", "classification-definitions", "classification-words"},
		// {"image-carpets", "image-differences"},
		{"image-expressions"},
		{"image-fields"},
		//{"math-equation"},
		{"math-middle", "math-sequence", "math-waste"},
		{"matrix-filling-pattern"},
		{"matrix-filling-unique"},
		{"matrix-sequence-pattern"},
		{"space-waste-2d", "space-waste-3d"},
		{"storytelling"},
		{"table-words"},
		{"text-letters"},
		{"text-reading"},
		{"text-tezirovanie"},
		{"words-column"},
		{"words-lexis-antonyms", "words-lexis-paronyms", "words-lexis-synonyms"},
		{"words-pairs"},
		{"words-questions-close", "words-questions-waste"},
	}

	rand.Shuffle(len(trainersRandom), func(i, j int) {
		trainersRandom[i], trainersRandom[j] = trainersRandom[j], trainersRandom[i]
	})

	var trainersFinish = [...]trainers.ITrainer{
		"matrix-sequence-random",
	}

	rand.Shuffle(len(trainersFinish), func(i, j int) {
		trainersFinish[i], trainersFinish[j] = trainersFinish[j], trainersFinish[i]
	})

	for i, max := 0, len(trainersRandom); i < max; i++ {
		current := trainersRandom[i]
		rand.Shuffle(len(current), func(i, j int) { current[i], current[j] = current[j], current[i] })
		trainersList = append(trainersList, current...)
		if i%3 == 0 {
			trainersList = append(trainersList, "relax")
		}
	}

	trainersList = append(trainersList, trainersFinish[0])

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
