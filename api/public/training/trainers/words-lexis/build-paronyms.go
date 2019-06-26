package wordsLexis

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"

	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

func BuildParonyms(ctx context.Context) (
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
		abstract.WordsLexisParonyms,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	var words [][]*string
	if err := sql.QueryRow(`
		SELECT
			jsonb_agg("words") AS "words"
		FROM(
			SELECT
				jsonb_build_array("wordA", "wordB") AS "words"
			FROM
				public.trainer_words_lexis
			WHERE
				"relation" = 'paronyms'
			ORDER BY random()
			LIMIT $1
		) t`,
		params.Quantity*params.MaxItems,
	).Scan(&words); err != nil {
		return nil, ctx, err
	}

	for i := 0; i < params.Quantity; i++ {
		itemsCount := rand.Intn(params.MaxItems-params.MinItems+1) + params.MinItems

		config := newConfig(abstract.WordsLexisParonyms, params)
		config.Items = words[0:itemsCount]
		words = words[itemsCount:]
		configs = append(configs, config)
	}

	return configs, ctx, nil
}
