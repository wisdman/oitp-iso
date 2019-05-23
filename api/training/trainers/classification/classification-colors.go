// Активизация лексиклна
// Укажите соответствующий цвет

package classification

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexityColorsData = [...]Parameters{
	Parameters{
		ItemTimeLimit: 10,
		Quantity:      5,
	},
	Parameters{
		ItemTimeLimit: 10,
		Quantity:      7,
	},
	Parameters{
		ItemTimeLimit: 8,
		Quantity:      7,
	},
}

func BuildColors(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityColorsData[complexity]

	rows, err := sql.Query(`
    SELECT "word", "color"
    FROM public.trainers_lexicon
    WHERE "color" IS NOT NULL
    ORDER BY random()
    LIMIT $1`,
		params.Quantity,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	config := newConfig(params, TypeColors)

	for rows.Next() {
		item := &Item{}
		if err = rows.Scan(&item.Data, &item.Group); err != nil {
			return nil, err
		}
		config.Items = append(config.Items, item)
	}

	configs = append(configs, config)
	return configs, nil
}
