package classificationDefinitions

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
		abstract.ClassificationDefinitions,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params)

		if err := sql.QueryRow(`
	   	SELECT jsonb_agg(to_jsonb(t3)) FROM (
				SELECT *, ROW_NUMBER() OVER (PARTITION BY "data" ORDER BY random()) AS cnt
				FROM(
			    SELECT unnest("definitions") AS "definition", "word" AS "data"
			    FROM (
			    	SELECT "definitions", "word"
			    	FROM public.trainer_definitions
			    	ORDER BY random()
			    	LIMIT public.random_in_range($1, $2)
			    ) t1
			    ORDER BY random()
			  ) t2
	   	) t3 WHERE t3.cnt = 1`,
			params.MinItems,
			params.MaxItems,
		).Scan(&config.Items); err != nil {
			return nil, ctx, err
		}

		configs = append(configs, config)
	}

	return configs, ctx, nil
}
