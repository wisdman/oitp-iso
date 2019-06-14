package matrixSequence

import (
	"context"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
)

var complexityPatternData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 30,

		Quantity:   3,
		MatrixSize: 25,

		ShowSuccess: true,
	},
	Parameters{
		PlayTimeLimit: 30,

		Quantity:   3,
		MatrixSize: 25,

		ShowSuccess: false,
	},
	Parameters{
		PlayTimeLimit: 20,

		Quantity:   5,
		MatrixSize: 25,

		ShowSuccess: false,
	},
}

func BuildPattern(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	sql := middleware.GetDBTransactionFromContext(ctx)
	params := complexityPatternData[0]

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
		params.Quantity,
	)
	if err != nil {
		return nil, ctx, err
	}
	defer rows.Close()

	for rows.Next() {
		config := newConfig(params)
		if err = rows.Scan(&config.Matrix); err != nil {
			return nil, ctx, err
		}
		configs = append(configs, config)
	}

	return configs, ctx, nil
}
