// Вербальный интеллект
//
// Синомимы .....
//

package wordsLexis

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexitySynonymsData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 60,
		ItemsCount:    5,
		Quantity:      1,
	},
	Parameters{
		PlayTimeLimit: 30,
		ItemsCount:    7,
		Quantity:      1,
	},
	Parameters{
		PlayTimeLimit: 20,
		ItemsCount:    5,
		Quantity:      2,
	},
}

func BuildSynonyms(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityAntonymsData[complexity]

	var words [][]*string
	if err := sql.QueryRow(`
		SELECT
			jsonb_agg("words") AS "words"
		FROM(
			SELECT
				jsonb_build_array("wordA", "wordB") AS "words"
			FROM
				public.trainer_words_lexis
			WHERE
				"relation" = 'paronyms'
			ORDER BY random()
			LIMIT $1
		) t`,
		params.Quantity*params.ItemsCount,
	).Scan(&words); err != nil {
		return nil, err
	}

	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params, Synonyms)
		config.Items = words[0:params.ItemsCount]
		words = words[params.ItemsCount:]
		configs = append(configs, config)
	}

	return configs, nil
}
