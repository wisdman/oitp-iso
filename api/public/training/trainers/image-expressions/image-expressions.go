package imageExpressions

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
)

var complexityData = [...]Parameters{
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,
		MinItems:      3,
		MaxItems:      5,
	},
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,
		MinItems:      5,
		MaxItems:      7,
	},
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,
		MinItems:      7,
		MaxItems:      9,
	},
	Parameters{
		ShowTimeLimit: 4,
		PlayTimeLimit: 30,
		MinItems:      7,
		MaxItems:      9,
	},
	Parameters{
		ShowTimeLimit: 3,
		PlayTimeLimit: 30,
		MinItems:      7,
		MaxItems:      9,
	},
	Parameters{
		ShowTimeLimit: 2,
		PlayTimeLimit: 30,
		MinItems:      7,
		MaxItems:      9,
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
    SELECT "id", "data"
    FROM public.trainer_image_expressions
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
		if err = rows.Scan(&item.Image, &item.Data); err != nil {
			return nil, ctx, err
		}
		config.Items = append(config.Items, item)
	}

	rand.Shuffle(len(config.Items), func(i, j int) { config.Items[i], config.Items[j] = config.Items[j], config.Items[i] })

	configs = append(configs, config)
	return configs, ctx, nil
}
