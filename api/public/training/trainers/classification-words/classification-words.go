package classificationWords

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
)

var complexityWordsData = [...]Parameters{
	Parameters{
		ItemTimeLimit: 20,
		MinItems:      2,
		MaxItems:      3,
		Quantity:      3,
	},
	Parameters{
		ItemTimeLimit: 20,
		MinItems:      3,
		MaxItems:      5,
		Quantity:      3,
	},
	Parameters{
		ItemTimeLimit: 20,
		MinItems:      5,
		MaxItems:      7,
		Quantity:      3,
	},
	Parameters{
		ItemTimeLimit: 20,
		MinItems:      3,
		MaxItems:      5,
		Quantity:      4,
	},
	Parameters{
		ItemTimeLimit: 15,
		MinItems:      3,
		MaxItems:      5,
		Quantity:      6,
	},
	Parameters{
		ItemTimeLimit: 10,
		MinItems:      3,
		MaxItems:      5,
		Quantity:      6,
	},
}

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	sql := middleware.GetDBTransactionFromContext(ctx)
	params := complexityWordsData[0]

	itemsCounts := make([]int, params.Quantity)
	var maxItems int
	for i := 0; i < params.Quantity; i++ {
		length := rand.Intn(params.MaxItems - params.MinItems + 1)
		itemsCounts[i] = length
		if itemsCounts[i] > maxItems {
			maxItems = itemsCounts[i]
		}
	}

	rows, err := sql.Query(`
    SELECT
      "word",
      "group"
    FROM(
      SELECT
        *,
        ROW_NUMBER() OVER (PARTITION BY "group" ORDER BY random()) AS cnt
      FROM(
        SELECT
          "group",
          unnest("words") AS "word"
        FROM (
          SELECT "group", "words"
          FROM public.trainer_words_groups
          ORDER BY random()
          LIMIT $1
        ) t1
      ) t2
    ) t3
    WHERE t3.cnt <= $2
    `,
		params.Quantity,
		maxItems,
	)
	if err != nil {
		return nil, ctx, err
	}
	defer rows.Close()

	config := newConfig(params)

	for rows.Next() {
		item := &Item{}
		if err = rows.Scan(&item.Word, &item.Data); err != nil {
			return nil, ctx, err
		}
		config.Items = append(config.Items, item)
	}

	configs = append(configs, config)
	return configs, ctx, nil
}
