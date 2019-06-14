package wordsColumn

import (
	"context"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
)

var complexityWordsColumn = [...]Parameters{
	Parameters{
		ShowTimeLimit: 30,
		PlayTimeLimit: 60,
		ItemsCount:    5,
		Quantity:      2,
	},
	Parameters{
		ShowTimeLimit: 20,
		PlayTimeLimit: 60,
		ItemsCount:    5,
		Quantity:      2,
	},
	Parameters{
		ShowTimeLimit: 20,
		PlayTimeLimit: 60,
		ItemsCount:    7,
		Quantity:      2,
	},
}

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	sql := middleware.GetDBTransactionFromContext(ctx)
	params := complexityWordsColumn[0]

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
		params.Quantity*params.ItemsCount,
	).Scan(&words); err != nil {
		return nil, ctx, err
	}

	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params)
		config.Items = words[0:params.ItemsCount]
		words = words[params.ItemsCount:]
		configs = append(configs, config)
	}

	return configs, ctx, nil
}
