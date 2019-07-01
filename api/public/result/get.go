package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

func (api *API) Get(w http.ResponseWriter, r *http.Request) {

	training := service.GetParam(r, "training")
	if training == "" {
		service.Error(w, http.StatusBadRequest)
		return
	}

	sql := middleware.GetDBTransaction(r)

	var resume *string
	if err := sql.QueryRow(`
    SELECT "resume"::text FROM public.self_training WHERE id = $1`,
		training,
	).Scan(&resume); err != nil {
		service.Fatal(w, err)
		return
	}

	service.ResponseText(w, resume)
}
