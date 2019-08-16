package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type Result struct {
	Idx uint16 `json:"idx"`

	PlayTime    uint32 `json:"playTime"`
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

	var response []byte
	if err := sql.QueryRow(`SELECT self.finish_training($1, $2)`, id, results).Scan(&response); err != nil {
		service.Fatal(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Write(response)
}
