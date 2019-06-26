package textLetters

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"

	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	sql := middleware.GetDBTransactionFromContext(ctx)

	var params Parameters
	if err := sql.QueryRow(`
    SELECT "complexity"
    FROM public.self_complexity
    WHERE "trainer" = $1`,
		abstract.TextLetters,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	quantity := rand.Intn(params.MaxQuantity-params.MinQuantity+1) + params.MinQuantity

	rows, err := sql.Query(`
		SELECT
			data
		FROM (
			SELECT
	      data,
	      array_length(regexp_split_to_array(trim(data), E'\\W+'), 1) AS "length"
	    FROM public.trainer_text_letters
		) t
		WHERE t."length" <= $1
		ORDER BY random()
    LIMIT $2
    `,
		params.MaxLength,
		quantity,
	)
	if err != nil {
		return nil, ctx, err
	}
	defer rows.Close()

	for rows.Next() {
		config := newConfig(params)
		if err = rows.Scan(&config.Data); err != nil {
			return nil, ctx, err
		}

		configs = append(configs, config)
	}

	return configs, ctx, nil
}
