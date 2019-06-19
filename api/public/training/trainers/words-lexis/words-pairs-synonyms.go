package wordsLexis

import (
	"context"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
)

var complexitySynonymsData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 40,
		ItemsCount:    5,
		Quantity:      1,
	},
	Parameters{
		PlayTimeLimit: 30,
		ItemsCount:    7,
		Quantity:      1,
	},
	Parameters{
		PlayTimeLimit: 20,
		ItemsCount:    5,
		Quantity:      2,
	},
}

func BuildSynonyms(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	sql := middleware.GetDBTransactionFromContext(ctx)
	params := complexityAntonymsData[0]

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
				"relation" = 'synonyms'
			ORDER BY random()
			LIMIT $1
		) t`,
		params.Quantity*params.ItemsCount,
	).Scan(&words); err != nil {
		return nil, ctx, err
	}

	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params, Synonyms)
		config.Items = words[0:params.ItemsCount]
		words = words[params.ItemsCount:]
		configs = append(configs, config)
	}

	return configs, ctx, nil
}
