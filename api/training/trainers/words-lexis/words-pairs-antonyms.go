// Вербальный интеллект
//
// Синомимы .....
//

package wordsPairs

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexityAntonymsData = [...]Parameters{
	Parameters{
		TimeLimit:  30,
		ItemsCount: 5,
		Quantity:   1,
	},
	Parameters{
		TimeLimit:  30,
		ItemsCount: 7,
		Quantity:   1,
	},
	Parameters{
		TimeLimit:  20,
		ItemsCount: 5,
		Quantity:   2,
	},
}

func BuildAntonyms(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityAntonymsData[complexity]

	var query string
	for i := 0; i < params.Quantity; i++ {
		if i > 0 {
			query += "\n			UNION \n"
		}
		query += `
			SELECT jsonb_agg("items") as "items"
			FROM (
				SELECT ARRAY["word", "antonym"] AS "items"
				FROM (
					SELECT DISTINCT ON ("word")
						"word",
						"antonym",
						ROW_NUMBER() OVER (PARTITION BY "word" ORDER BY random()) AS cnt
					FROM (
						SELECT "word", unnest("antonyms") AS "antonym"
						FROM public.trainers_lexicon
						WHERE array_length("antonyms",1) > 0
						ORDER BY random()
					) t1
				) t2
				ORDER BY random()
				LIMIT $1
			) t3`
	}

	rows, err := sql.Query(query, params.ItemsCount)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		config := newConfig(params)
		config.ItemsType = Antonyms
		if err = rows.Scan(&config.Items); err != nil {
			return nil, err
		}
		configs = append(configs, config)
	}

	return configs, nil
}
