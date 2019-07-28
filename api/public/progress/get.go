package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

func (api *API) Get(w http.ResponseWriter, r *http.Request) {
	progress := &Progress{
		Charge: 100,
		Speed:  []uint16{50, 50},
	}

	sql := middleware.GetDBTransaction(r)

	if err := sql.QueryRow(
		`SELECT jsonb_agg("progress") AS "items" FROM self.progress`,
	).Scan(&progress.Items); err != nil {
		service.Fatal(w, err)
		return
	}

	service.ResponseJSON(w, progress)
}
