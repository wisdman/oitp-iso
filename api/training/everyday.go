package main

import (
	"encoding/json"
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/service"
	"github.com/wisdman/oitp-isov/api/training/trainers/image-fields"
	"github.com/wisdman/oitp-isov/api/training/trainers/table-pipe"
)

func (api *API) Everyday(w http.ResponseWriter, r *http.Request) {

	sql, err := api.db.Acquire()
	if err != nil {
		service.Fatal(w, err)
		return
	}

	training := newTraining(1800)
	var configs []interface{}

	// === Разминка - Буквы
	if configs, err = tablePipe.Build(sql, 0, tablePipe.RunesRU); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, configs...)

	// === Разминка - Цифры
	if configs, err = tablePipe.Build(sql, 0, tablePipe.RunesNUMBERS); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, configs...)

	// Запоминание картинок
	if configs, err = imageFields.Build(sql, 0); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, configs...)

	if err = sql.Commit(); err != nil {
		service.Fatal(w, err)
		return
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(training)
}
