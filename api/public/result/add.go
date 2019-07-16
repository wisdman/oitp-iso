package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type Result struct {
	Idx uint16 `json:"idx"`

	Result *int16 `json:"result"`
	Time   uint32 `json:"time"`

	IsTimeout bool `json:"isTimeout"`
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

	sql := middleware.GetDBTransaction(r)

	if _, err := sql.Exec(`
    SELECT public.training__add_result($1, $2, $3)`,
		training,
		result.Idx,
		result,
	); err != nil {
		service.Fatal(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
