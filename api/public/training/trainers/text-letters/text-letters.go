package textLetters

import (
	"context"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
)

var complexityData = [...]Parameters{
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 20,

		MaxLength: 6,
		Quantity:  3,
	},
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 20,

		MaxLength: 8,
		Quantity:  3,
	},
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 20,

		MaxLength: 10,
		Quantity:  3,
	},
}

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	sql := middleware.GetDBTransactionFromContext(ctx)
	params := complexityData[0]

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
		params.Quantity,
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
