package main

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"time"

	"github.com/wisdman/oitp-isov/api/lib/service"

	"github.com/wisdman/oitp-isov/api/training/trainers"
)

func (api *API) _Everyday(w http.ResponseWriter, r *http.Request) {
	rand.Seed(time.Now().UnixNano())

	var trainersList = []trainers.ITrainer{
		"table-pipe-ru", "table-pipe-number",
	}

	var trainersRandom = [][]trainers.ITrainer{
		{"classification-words", "classification-definitions", "classification-colors"},
		{"image-carpets", "image-differences"},

		{"math-middle", "math-sequence", "math-waste", "math-equation"},
		{"matrix-filling-pattern"},
		{"matrix-sequence-pattern"},

		{"words-pairs-antonyms", "words-pairs-paronyms", "words-pairs-synonyms", "words-questions-close", "words-questions-waste"},
		{"matrix-filling-unique"},

		{"words-columns-pairs", "words-columns-words"},
		{"space-part", "space-waste-2d", "space-waste-3d"},
		{"text-reading-ro", "text-reading-tezirovanie"},
		{"table-words"},
		{"text-letters"},
		{"image-expressions", "image-fields"},
	}

	rand.Shuffle(len(trainersRandom), func(i, j int) {
		trainersRandom[i], trainersRandom[j] = trainersRandom[j], trainersRandom[i]
	})

	var trainersFinish = [...]trainers.ITrainer{"matrix-filling-random", "matrix-sequence-random"}

	rand.Shuffle(len(trainersFinish), func(i, j int) {
		trainersFinish[i], trainersFinish[j] = trainersFinish[j], trainersFinish[i]
	})

	for i, max := 0, len(trainersRandom); i < max; i++ {
		current := trainersRandom[i]
		length := len(current)
		if length > 1 {
			rand.Shuffle(length, func(i, j int) {
				current[i], current[j] = current[j], current[i]
			})

			if length > 3 {
				length = 3
			} else {
				length = length - 1
			}

			trainersList = append(trainersList, current[:length]...)
		} else {
			trainersList = append(trainersList, current[0])
		}

		if i%3 == 0 {
			trainersList = append(trainersList, "relax")
		}
	}

	trainersList = append(trainersList, trainersFinish[0])

	sql, err := api.db.Acquire()
	if err != nil {
		service.Fatal(w, err)
		return
	}

	training := newTraining(1800)
	var configs []interface{}

	for i, max := 0, len(trainersList); i < max; i++ {
		if configs, err = trainers.Build(sql, trainersList[i], 0); err != nil {
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
