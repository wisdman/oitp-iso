package main

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"time"

	"github.com/wisdman/oitp-isov/api/lib/service"
	"github.com/wisdman/oitp-isov/api/training/trainers/classification-words"
	"github.com/wisdman/oitp-isov/api/training/trainers/image-fields"
	"github.com/wisdman/oitp-isov/api/training/trainers/matrix-filling"
	"github.com/wisdman/oitp-isov/api/training/trainers/matrix-sequence"
	"github.com/wisdman/oitp-isov/api/training/trainers/question-words"
	"github.com/wisdman/oitp-isov/api/training/trainers/relax"
	"github.com/wisdman/oitp-isov/api/training/trainers/table-pipe"
)

func (api *API) Everyday(w http.ResponseWriter, r *http.Request) {
	rand.Seed(time.Now().UnixNano())

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

	// Relax
	if configs, err = relax.Build(sql, 1); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, configs...)

	// Таблицы числовые на основе паттернов
	if configs, err = matrixSequence.Build(sql, 0); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, configs...)

	// Классификация слов
	if configs, err = classificationWords.Build(sql, 0); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, configs...)

	// Таблицы с уникальными картинками
	if configs, err = matrixFilling.BuildUnique(sql, 0); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, configs...)

	// Relax
	if configs, err = relax.Build(sql, 1); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, configs...)

	// === Уберите лишнее слово
	if configs, err = questionWords.Build(sql, 0, questionWords.Waste); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, configs...)

	// === Слово - это
	if configs, err = questionWords.Build(sql, 0, questionWords.Close); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, configs...)

	// Таблицы с картинками по паттернам
	if configs, err = matrixFilling.Build(sql, 0); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, configs...)

	// Таблицы числовые случайные
	if configs, err = matrixSequence.BuildRandom(sql, 0); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, configs...)

	// Таблицы с картинками случайные
	if configs, err = matrixFilling.BuildRandom(sql, 0); err != nil {
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
