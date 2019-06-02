package classificationColors

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexityColorsData = [...]Parameters{
	Parameters{
		ItemTimeLimit: 20,
		MinItems:      5,
		MaxItems:      7,
	},
	Parameters{
		ItemTimeLimit: 20,
		MinItems:      7,
		MaxItems:      9,
	},
	Parameters{
		ItemTimeLimit: 15,
		MinItems:      7,
		MaxItems:      9,
	},
	Parameters{
		ItemTimeLimit: 10,
		MinItems:      7,
		MaxItems:      9,
	},
	Parameters{
		ItemTimeLimit: 8,
		MinItems:      7,
		MaxItems:      9,
	},
	Parameters{
		ItemTimeLimit: 5,
		MinItems:      10,
		MaxItems:      10,
	},
}

func Build(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityColorsData[complexity]

	rows, err := sql.Query(`
    SELECT "color", "word"
    FROM public.trainers_lexicon
    WHERE "color" IS NOT NULL
    ORDER BY random()
    LIMIT public.random_range($1,$2)`,
		params.MinItems,
		params.MaxItems,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	config := newConfig(params)

	for rows.Next() {
		item := &Item{}
		if err = rows.Scan(&item.Color, &item.Data); err != nil {
			return nil, err
		}
		config.Items = append(config.Items, item)
	}

	configs = append(configs, config)
	return configs, nil
}
