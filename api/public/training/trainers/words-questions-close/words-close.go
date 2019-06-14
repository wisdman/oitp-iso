package wordsQuestionClose

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
)

var complexityData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 30,
		Quantity:      3,
	},
	Parameters{
		PlayTimeLimit: 20,
		Quantity:      3,
	},
	Parameters{
		PlayTimeLimit: 10,
		Quantity:      3,
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
	  SELECT
	   	"word",
	    "items"
	  FROM
	  	public.trainer_words_close
	  ORDER BY random()
	  LIMIT $1`,
		params.Quantity,
	)
	if err != nil {
		return nil, ctx, err
	}
	defer rows.Close()

	for rows.Next() {
		config := newConfig(params)
		if err = rows.Scan(&config.Word, &config.Items); err != nil {
			return nil, ctx, err
		}
		rand.Shuffle(len(config.Items), func(i, j int) { config.Items[i], config.Items[j] = config.Items[j], config.Items[i] })
		configs = append(configs, config)
	}

	return configs, ctx, nil
}
