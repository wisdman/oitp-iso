package trainers

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/uuid"
)

type TextReadingParameters struct {
	TimeLimit int `json:"timeLimit"`
}

type TextReadingConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit uint16 `json:"timeLimit"`

	Data string `json:"data"`
}

func newTextReadingConfig(timeLimit uint16) *TextReadingConfig {
	return &TextReadingConfig{
		ID:        "text-reading",
		UID:       uuid.UUID(),
		TimeLimit: timeLimit,
	}
}

func TextReading(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {

	var parameters TextPairsParameters
	if err = GetComplexityConfig(sql, "text-reading", complexity, &parameters); err != nil {
		return nil, err
	}

	config := newTextReadingConfig(uint16(parameters.TimeLimit))

	var questions []*QuestionConfig
	if err := sql.QueryRow(`
    SELECT
      "data",
      "questions"
    FROM public.trainers_data_texts
    WHERE "type" = 'reading'
    ORDER BY random()
    LIMIT 1`,
	).Scan(&config.Data, &questions); err != nil {
		return nil, err
	}

	configs = append(configs, config)

	for i, max := 0, len(questions); i < max; i++ {
		questions[i].ID = "question"
		questions[i].UID = uuid.UUID()
		configs = append(configs, questions[i])
	}

	return configs, nil
}
