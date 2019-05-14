package classification

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/w-rand"
)

var complexityWordsData = [...]Parameters{
	Parameters{
		ItemTimeLimit: 10,
		MinItems:      3,
		MaxItems:      5,
		Quantity:      3,
	},
	Parameters{
		ItemTimeLimit: 10,
		MinItems:      3,
		MaxItems:      5,
		Quantity:      4,
	},
	Parameters{
		ItemTimeLimit: 8,
		MinItems:      5,
		MaxItems:      7,
		Quantity:      6,
	},
}

func BuildWords(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityWordsData[complexity]

	itemsCounts := make([]int, params.Quantity)
	var maxItems int
	for i := 0; i < params.Quantity; i++ {
		length := wRand.Range(params.MinItems, params.MaxItems)
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
          SELECT "group", array_agg("word") AS "words"
          FROM public.trainers_lexicon
          WHERE "group" IS NOT NULL
          GROUP BY "group"
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
		return nil, err
	}
	defer rows.Close()

	config := newConfig(params, TypeTexts)

	for rows.Next() {
		item := &Item{}
		if err = rows.Scan(&item.Data, &item.Group); err != nil {
			return nil, err
		}
		config.Items = append(config.Items, item)
	}

	wRand.Shuffle(len(config.Items), func(i, j int) { config.Items[i], config.Items[j] = config.Items[j], config.Items[i] })

	configs = append(configs, config)
	return configs, nil
}
