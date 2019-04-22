package trainers

import (
	"github.com/google/uuid"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

type TextReadingConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit int    `json:"timeLimit"`
	Data      string `json:"data"`
}

type TextReadingParameters struct {
	TimeLimit int `json:"timeLimit"`
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

	uid, err := uuid.NewUUID()
	if err != nil {
		return nil, err
	}

	config := &TextReadingConfig{
		ID:        "text-reading",
		UID:       uid.String(),
		TimeLimit: parameters.TimeLimit,
	}

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

	for i, max := 0, len(questions); i < max; i++ {
		uid, err := uuid.NewUUID()
		if err != nil {
			return nil, err
		}
		questions[i].ID = "question"
		questions[i].UID = uid.String()
	}

	configs = append(configs, config)

	for q := range questions {
		configs = append(configs, q)
	}

	return configs, nil
}
