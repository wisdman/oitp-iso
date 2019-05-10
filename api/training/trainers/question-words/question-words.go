package questionWords

import (
	"fmt"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/training/trainers"
)

func Build(
	sql *db.Transaction,
	complexity uint8,
	wordsType IWordsType,
) (
	configs []interface{},
	err error,
) {

	var params Parameters
	switch wordsType {
	case Waste:
		err = trainers.QueryParameters(sql, trainers.QuestionWasteWords, complexity, &params)
	case Close:
		err = trainers.QueryParameters(sql, trainers.QuestionCloseWords, complexity, &params)
	default:
		panic("Incorrenc Words Type")
	}
	if err != nil {
		return nil, err
	}

	fmt.Printf("%+v\n", wordsType)

	rows, err := sql.Query(`
    SELECT
      body,
      items
    FROM public.trainers_data_questions
    WHERE type = $1
    ORDER BY random()
    LIMIT $2
    `,
		string(wordsType),
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

		rand.Shuffle(len(config.Items), func(i, j int) { config.Items[i], config.Items[j] = config.Items[j], config.Items[i] })
		configs = append(configs, config)
	}

	return configs, nil
}
