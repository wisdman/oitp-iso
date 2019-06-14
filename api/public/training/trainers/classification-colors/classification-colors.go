package classificationColors

import (
	"context"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
)

var complexityColorsData = [...]Parameters{
	Parameters{
		ItemTimeLimit: 20,
		MinItems:      5,
		MaxItems:      7,
	},
	Parameters{
		ItemTimeLimit: 20,
		MinItems:      7,
		MaxItems:      9,
	},
	Parameters{
		ItemTimeLimit: 15,
		MinItems:      7,
		MaxItems:      9,
	},
	Parameters{
		ItemTimeLimit: 10,
		MinItems:      7,
		MaxItems:      9,
	},
	Parameters{
		ItemTimeLimit: 8,
		MinItems:      7,
		MaxItems:      9,
	},
	Parameters{
		ItemTimeLimit: 5,
		MinItems:      10,
		MaxItems:      10,
	},
}

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	sql := middleware.GetDBTransactionFromContext(ctx)
	params := complexityColorsData[0]

	rows, err := sql.Query(`
    SELECT "color", "data"
    FROM public.trainer_colors
    ORDER BY random()
    LIMIT public.random_in_range($1,$2)`,
		params.MinItems,
		params.MaxItems,
	)
	if err != nil {
		return nil, ctx, err
	}
	defer rows.Close()

	config := newConfig(params)

	for rows.Next() {
		item := &Item{}
		if err = rows.Scan(&item.Color, &item.Data); err != nil {
			return nil, ctx, err
		}
		config.Items = append(config.Items, item)
	}

	configs = append(configs, config)
	return configs, ctx, nil
}
