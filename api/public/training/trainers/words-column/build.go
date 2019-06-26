package wordsColumn

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
		abstract.WordsColumn,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	quantity := rand.Intn(params.MaxQuantity-params.MinQuantity+1) + params.MinQuantity

	var words []string
	if err := sql.QueryRow(`
	  SELECT
			array_agg("word") AS "words"
		FROM(
  		SELECT
  			"word"
  		FROM
  			public.trainer_words_column
  		ORDER BY random()
  		LIMIT $1
    ) t`,
		quantity*params.MaxItems,
	).Scan(&words); err != nil {
		return nil, ctx, err
	}

	for i := 0; i < quantity; i++ {
		itemsCount := rand.Intn(params.MaxItems-params.MinItems+1) + params.MinItems

		config := newConfig(params)
		config.Items = words[0:itemsCount]
		words = words[itemsCount:]
		configs = append(configs, config)
	}

	return configs, ctx, nil
}
