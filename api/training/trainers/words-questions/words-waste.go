// Вербальный интеллект
//
// Выделите существенный признак предмета
// Уберите лишнее
//

package wordsQuestion

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/w-rand"
)

var complexityWasteData = [...]Parameters{
	Parameters{
		TimeLimit: 30,
		Quantity:  3,
	},
	Parameters{
		TimeLimit: 20,
		Quantity:  3,
	},
	Parameters{
		TimeLimit: 10,
		Quantity:  3,
	},
}

func BuildWaste(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityWasteData[complexity]

	rows, err := sql.Query(`
    SELECT
      "body", "items"
    FROM public.trainers_questions
    WHERE type = 'words-waste'
    ORDER BY random()
    LIMIT $1
    `,
		params.Quantity,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		config := newQuestionConfig(params)
		if err = rows.Scan(&config.Body, &config.Items); err != nil {
			return nil, err
		}
		wRand.Shuffle(len(config.Items), func(i, j int) { config.Items[i], config.Items[j] = config.Items[j], config.Items[i] })
		configs = append(configs, config)
	}

	return configs, nil
}
