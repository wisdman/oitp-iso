package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type Config struct {
	Id       string `json:"id"`
	UUID     string `json:"uuid"`
	Training string `json:"training"`
}

type Result struct {
	Config Config `json:"config"`

	IsTimeout bool   `json:"isTimeout"`
	Time      uint16 `json:"time"`

	Success uint16 `json:"success"`
	Error   uint16 `json:"error"`
}

func (api *API) Result(w http.ResponseWriter, r *http.Request) {
	var result Result
	err := service.DecodeJSONBody(r, &result)
	if err != nil {
		service.Error(w, http.StatusBadRequest)
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
		result.Config.Training,
	); err != nil {
		service.Fatal(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
