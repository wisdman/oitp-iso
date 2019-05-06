package trainers

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

type QuestionWasteWordsParameters struct {
	TimeLimit int `json:"timeLimit"`
}

func QuestionWasteWords(
	sql *db.Transaction,
	complexity uint8,
	quantity int,
) (
	configs []interface{},
	err error,
) {

	var parameters QuestionWasteWordsParameters
	if err = GetComplexityConfig(sql, "question-waste-words", complexity, &parameters); err != nil {
		return nil, err
	}

	rows, err := sql.Query(`
    SELECT
      body,
      items
    FROM public.trainers_data_questions
    WHERE type = 'waste'
    ORDER BY random()
    LIMIT $1
    `,
		quantity,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var question string
		var answers []*QuestionItem
		if err = rows.Scan(&question, &answers); err != nil {
			return nil, err
		}

		config := newQuestionConfig(QuestionItemsType_Text, parameters.TimeLimit)
		config.Data = "<h1>Укажите лишнее слово</h1>"
		config.Items = answers

		configs = append(configs, config)
	}

	return configs, nil
}

type QuestionCloseWordsParameters struct {
	TimeLimit int `json:"timeLimit"`
}

func QuestionCloseWords(
	sql *db.Transaction,
	complexity uint8,
	quantity int,
) (
	configs []interface{},
	err error,
) {

	var parameters QuestionWasteWordsParameters
	if err = GetComplexityConfig(sql, "question-close-words", complexity, &parameters); err != nil {
		return nil, err
	}

	rows, err := sql.Query(`
    SELECT
      body,
      items
    FROM public.trainers_data_questions
    WHERE type = 'close'
    ORDER BY random()
    LIMIT $1
    `,
		quantity,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var question string
		var answers []*QuestionItem
		if err = rows.Scan(&question, &answers); err != nil {
			return nil, err
		}

		config := newQuestionConfig(QuestionItemsType_Text, parameters.TimeLimit)
		config.Data = question + "<p>это</p>"
		config.Items = answers

		configs = append(configs, config)
	}

	return configs, nil
}
