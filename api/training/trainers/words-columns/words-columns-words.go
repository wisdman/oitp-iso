// Мнемотехника. Столбики
//
// Соедините слова нелепой связью и запомните их.
//
// Восстановите слова по памяти
//

package wordsColumns

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexityWordsData = [...]Parameters{
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
		Quantity:      3,
	},
	Parameters{
		ShowTimeLimit: 20,
		PlayTimeLimit: 60,
		ItemsCount:    7,
		Quantity:      3,
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

	var query string
	for i := 0; i < params.Quantity; i++ {
		if i > 0 {
			query += " UNION "
		}
		query += `
			SELECT jsonb_agg("word") AS "items"
			FROM (
				SELECT ARRAY["word"] AS "word"
				FROM public.trainers_lexicon
				WHERE "forColumns"
				ORDER BY random()
				LIMIT $1
			) t`
	}

	rows, err := sql.Query(query, params.ItemsCount)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		config := newConfig(params)
		if err = rows.Scan(&config.Items); err != nil {
			return nil, err
		}
		configs = append(configs, config)
	}

	return configs, nil
}
