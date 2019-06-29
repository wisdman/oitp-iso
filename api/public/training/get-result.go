package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

func (api *API) GetResult(w http.ResponseWriter, r *http.Request) {

	training := service.GetParam(r, "training")
	if training == "" {
		service.Error(w, http.StatusBadRequest)
		return
	}

	sql := middleware.GetDBTransaction(r)

	if _, err := sql.Exec(`
    UPDATE public.self_training
    SET
      "finish" = timezone('UTC', now())
    WHERE
      "id" = $1`,
		training,
	); err != nil {
		service.Fatal(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
