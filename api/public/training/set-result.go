package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type Result struct {
	UUID string `json:"uuid"`

	IsTimeout bool   `json:"isTimeout"`
	Time      uint16 `json:"time"`

	Success uint16 `json:"success"`
	Error   uint16 `json:"error"`
}

func (api *API) SetResult(w http.ResponseWriter, r *http.Request) {

	training := service.GetParam(r, "training")
	if training == "" {
		service.Error(w, http.StatusBadRequest)
		return
	}

	var result Result
	err := service.DecodeJSONBody(r, &result)
	if err != nil {
		service.Error(w, http.StatusBadRequest)
		return
	}

	if result.UUID == "" {
		w.WriteHeader(http.StatusOK)
		return
	}

	sql := middleware.GetDBTransaction(r)

	if _, err := sql.Exec(`
    UPDATE public.self_training
    SET
      "results" = "results" || $1
    WHERE
      "id" = $2`,
		[...]Result{result},
		training,
	); err != nil {
		service.Fatal(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
