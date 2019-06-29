package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

func (api *API) Get(w http.ResponseWriter, r *http.Request) {
	progress := &Progress{
		Charge: 100,

		Memory:       50,
		Knowledge:    50,
		Intelligence: 50,

		Speed: []uint16{50, 50, 50, 50, 50},
	}

	sql := middleware.GetDBTransaction(r)

	rows, err := sql.Query(`
    SELECT
    	jsonb_build_object(
    		'id', "id",
    		'values', array_agg("data" ORDER BY "ts"),
    		'average', ROUND(AVG("data"))
    	)
		FROM (
		  SELECT
		    r."finish" AS "ts",
		    g."group" AS "id",
		    ROUND(AVG(("result"->'result')::int)) AS "data"
		  FROM (
		    SELECT
		      "finish",
		      jsonb_array_elements("results") AS "result",
		      jsonb_array_elements("trainers") AS "config"
		    FROM (
		      SELECT
		        "finish",
		        "results",
		        "trainers"
		      FROM public.self_training
		      WHERE
		        "finish" IS NOT NULL
		        AND
		        "type" = 'everyday'
		      ORDER BY "finish" DESC
		      LIMIT 7
		    ) AS t
		  ) AS r
		  LEFT JOIN
		    public.trainer_to_group AS g
		      ON ("trainer"::text = "config"->>'id')
		  WHERE
		    r."result"->>'uuid' = r."config"->>'uuid'
		    AND
		    r."result"->>'result' IS NOT NULL
		    AND
		    g."group" IS NOT NULL
		  GROUP BY "ts", "id"
		) AS d GROUP BY "id"`,
	)
	if err != nil {
		service.Fatal(w, err)
		return
	}
	defer rows.Close()

	for rows.Next() {
		item := &Item{}

		if err = rows.Scan(item); err != nil {
			service.Fatal(w, err)
			return
		}

		progress.Items = append(progress.Items, item)
	}

	service.ResponseJSON(w, progress)
}
