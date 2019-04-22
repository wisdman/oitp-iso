package trainers

import (
	"github.com/google/uuid"

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
		var answers []*QuestionAnswer
		if err = rows.Scan(&question, &answers); err != nil {
			return nil, err
		}

		uid, err := uuid.NewUUID()
		if err != nil {
			return nil, err
		}

		config := &QuestionConfig{
			ID:        "question",
			UID:       uid.String(),
			Body:      "<h1>Укаите лишнее слово</h1>",
			TimeLimit: parameters.TimeLimit,

			Type:   "text",
			Button: "",

			Items: answers,
		}

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
		var answers []*QuestionAnswer
		if err = rows.Scan(&question, &answers); err != nil {
			return nil, err
		}

		uid, err := uuid.NewUUID()
		if err != nil {
			return nil, err
		}

		config := &QuestionConfig{
			ID:        "question",
			UID:       uid.String(),
			Body:      question,
			TimeLimit: parameters.TimeLimit,

			Type:   "text",
			Button: "",

			Items: answers,
		}

		configs = append(configs, config)
	}

	return configs, nil
}
