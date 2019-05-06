package main

import (
	"encoding/json"
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/service"
	"github.com/wisdman/oitp-isov/api/training/trainers"
	"github.com/wisdman/oitp-isov/api/training/trainers/table-pipe"
)

func (api *API) Specific(w http.ResponseWriter, r *http.Request) {

	sql, err := api.db.Acquire()
	if err != nil {
		service.Fatal(w, err)
		return
	}

	training := newTraining(1800)

	trainerType := trainers.ITrainer(service.GetParam(r, "type"))
	switch trainerType {
	case trainers.TablePipe:
		training.Trainers, err = tablePipe.Build(sql, 0, tablePipe.RunesRU)
	default:
		service.Error(w, http.StatusNotFound)
		sql.Rollback()
		return
	}

	if err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}

	if err = sql.Commit(); err != nil {
		service.Fatal(w, err)
		return
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(training)
}
