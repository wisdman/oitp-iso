package main

import (
	"fmt"
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type Result struct {
	Idx uint16 `json:"idx"`

	Time        uint32 `json:"playTime"`
	PreviewTime uint32 `json:"previewTime"`

	Result *uint16 `json:"result"`
}

func (api *API) Finish(w http.ResponseWriter, r *http.Request) {

	id := service.GetParam(r, "id")
	if id == "" {
		service.Error(w, http.StatusBadRequest)
		return
	}

	var results []*Result
	err := service.DecodeJSONBody(r, &results)
	if err != nil {
		service.Error(w, http.StatusBadRequest)
		return
	}

	sql := middleware.GetDBTransaction(r)

	var trainingResult string
	if err := sql.QueryRow(`SELECT public.training__finish($1, $2)::text`, id, results).Scan(&trainingResult); err != nil {
		service.Fatal(w, err)
		return
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, trainingResult)
}
