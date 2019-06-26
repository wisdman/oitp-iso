package classificationWords

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
		abstract.ClassificationWords,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params)

		if err := sql.QueryRow(`
      SELECT jsonb_agg(to_jsonb(t3)) FROM (
        SELECT *, ROW_NUMBER() OVER (PARTITION BY "data" ORDER BY random()) AS cnt
        FROM(
          SELECT
            "group" as "data", unnest("words") AS "word"
          FROM (
            SELECT "group", "words"
            FROM public.trainer_words_groups
            ORDER BY random()
            LIMIT public.random_in_range($1, $2)
          ) t1
        ) t2
      ) t3 WHERE t3.cnt <= public.random_in_range($3, $4)`,
			params.MinGroups,
			params.MaxGroups,
			params.MinItems,
			params.MaxItems,
		).Scan(&config.Items); err != nil {
			return nil, ctx, err
		}

		configs = append(configs, config)
	}

	return configs, ctx, nil
}
