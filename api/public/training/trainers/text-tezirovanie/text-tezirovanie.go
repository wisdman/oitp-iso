package textTezirovanie

import (
	"context"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
)

var complexityTezirovanieData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 60,
	},
	Parameters{
		PlayTimeLimit: 60,
	},
	Parameters{
		PlayTimeLimit: 30,
	},
}

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	sql := middleware.GetDBTransactionFromContext(ctx)
	params := complexityTezirovanieData[0]
	config := newConfig(params)

	if err := sql.QueryRow(`
    SELECT
      "data"
    FROM public.trainer_text_tezirovanie
    ORDER BY random()
    LIMIT 1`,
	).Scan(&config.Data); err != nil {
		return nil, ctx, err
	}

	configs = append(configs, config)
	return configs, ctx, nil
}
