package matrixSequence

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"

	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

func BuildPattern(ctx context.Context) (
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
		abstract.MatrixSequencePattern,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	quantity := rand.Intn(params.MaxQuantity-params.MinQuantity+1) + params.MinQuantity

	rows, err := sql.Query(`
    SELECT
      "data"
    FROM public.trainer_patterns
    WHERE
      "type" = 'numbers'
      AND
      array_length("data", 1) = $1
    ORDER BY random()
    LIMIT $2
    `,
		params.MatrixSize,
		quantity,
	)
	if err != nil {
		return nil, ctx, err
	}
	defer rows.Close()

	for rows.Next() {
		config := newConfig(abstract.MatrixSequencePattern, params)
		if err = rows.Scan(&config.Matrix); err != nil {
			return nil, ctx, err
		}
		configs = append(configs, config)
	}

	return configs, ctx, nil
}
