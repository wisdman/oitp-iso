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

	Result *int16 `json:"result"`
}

func (api *API) Add(w http.ResponseWriter, r *http.Request) {

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
    SELECT public.training__add_result($1, $2)`,
		training,
		[...]Result{result},
	); err != nil {
		service.Fatal(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
