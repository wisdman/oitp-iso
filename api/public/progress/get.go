package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type Item struct {
	Id      string  `json:"id"`
	Values  []int16 `json:"values"`
	Average int     `json:"average"`
}

func (api *API) Get(w http.ResponseWriter, r *http.Request) {
	sql := middleware.GetDBTransaction(r)

	var progress []*Item
	if err := sql.QueryRow(`
		SELECT jsonb_agg("progress") AS "items"
		FROM (
			SELECT "progress" FROM self.progress
			UNION ALL
			SELECT "progress" FROM self.progress__speed
			UNION ALL
			SELECT "progress" FROM self.progress__charge
		) AS t
	`).Scan(&progress); err != nil {
		service.Fatal(w, err)
		return
	}

	service.ResponseJSON(w, progress)
}
