package main

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

func Expression(sql *db.Transaction) (
	recommendation *Recommendation,
	err error,
) {

	recommendation = newRecommendation(Text)

	if err := sql.QueryRow(`
     SELECT
       "data"
     FROM public.expression_great
     ORDER BY random()
     LIMIT 1`,
	).Scan(&recommendation.Data); err != nil {
		return nil, err
	}

	return recommendation, nil
}
