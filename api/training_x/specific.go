package main

import (
	"encoding/json"
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/service"
	"github.com/wisdman/oitp-isov/api/training/trainers"
)

func (api *API) Specific(w http.ResponseWriter, r *http.Request) {

	sql, err := api.db.Acquire()
	if err != nil {
		service.Fatal(w, err)
		return
	}

	trainerType := service.GetParam(r, "type")

	var value []interface{}
	switch trainerType {
	case "classification-colors":
		value, err = trainers.ClassificationColors(sql, 0)
	case "classification-words":
		value, err = trainers.ClassificationWords(sql, 0)
	case "image-fields":
		value, err = trainers.ImageFields(sql, 0)
	case "text-sort":
		value, err = trainers.TextSort(sql, 0)
	case "text-reading":
		value, err = trainers.TextReading(sql, 0)
	case "matrix-filling":
		value, err = trainers.MatrixFillingIcons(sql, 0, 3)
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

	training := &Training{
		ID:          "00000000-0000-0000-0000-000000000000",
		Title:       "Единственный тренажер",
		Description: "Тренажер без описания",
		TimeLimit:   7200,
		Trainers:    value,
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(training)
}
