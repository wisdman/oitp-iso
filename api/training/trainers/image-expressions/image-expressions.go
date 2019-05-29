// Горманизация работы полушарийй
// Запомните название
// Восстановите название по памяти

package imageExpressions

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/w-rand"
)

var complexityData = [...]Parameters{
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,
		Quantity:      3,
	},
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,
		Quantity:      5,
	},
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,
		Quantity:      7,
	},
}

func Build(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityData[complexity]

	rows, err := sql.Query(`
    SELECT "id", "data"
    FROM public.trainers_image_expressions
    ORDER BY random()
    LIMIT $1`,
		params.Quantity,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	config := newConfig(params)

	for rows.Next() {
		item := &Item{}
		if err = rows.Scan(&item.Image, &item.Data); err != nil {
			return nil, err
		}
		config.Items = append(config.Items, item)
	}

	wRand.Shuffle(len(config.Items), func(i, j int) { config.Items[i], config.Items[j] = config.Items[j], config.Items[i] })

	configs = append(configs, config)
	return configs, nil
}
