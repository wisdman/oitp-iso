package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

func (api *API) Get(w http.ResponseWriter, r *http.Request) {
	sql := middleware.GetDBTransaction(r)
	info := newInfo(Text)

	err := sql.QueryRow(`
    SELECT
       "data"
     FROM public.expressions
     ORDER BY random()
     LIMIT 1`,
	).Scan(&info.Data)
	if err != nil {
		service.Fatal(w, err)
		return
	}

	service.ResponseJSON(w, info)
}
