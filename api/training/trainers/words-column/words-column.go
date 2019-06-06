// Мнемотехника. Столбики
//
// Соедините слова нелепой связью и запомните их.
//
// Восстановите слова по памяти
//

package wordsColumn

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
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

func Build(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityWordsColumn[complexity]

	var words []*string
	if err := sql.QueryRow(`
		SELECT
			"word"
		FROM
			public.trainers_words_column
		ORDER BY random()
		LIMIT $1`,
		params.Quantity*params.ItemsCount,
	).Scan(&words); err != nil {
		return nil, err
	}

	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params)
		config.Items = words[0:params.ItemsCount]
		words = words[params.ItemsCount:]
		configs = append(configs, config)
	}

	return configs, nil
}
