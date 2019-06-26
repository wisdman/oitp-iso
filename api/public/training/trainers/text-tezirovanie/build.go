package textTezirovanie

import (
	"context"

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
		abstract.TextTezirovanie,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

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
