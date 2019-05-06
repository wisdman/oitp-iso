package trainers

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/uuid"
)

type TextLettersParameters struct {
	ItemsLimit int `json:"itemsLimit"`
	TimeLimit  int `json:"timeLimit"`
}

type TextLettersConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit uint16 `json:"timeLimit"`

	Data string `json:"data"`
}

func newTextLettersConfig(timeLimit uint16) *TextLettersConfig {
	return &TextLettersConfig{
		ID:        "text-letters",
		UID:       uuid.UUID(),
		TimeLimit: timeLimit,
	}
}

func TextLetters(
	sql *db.Transaction,
	complexity uint8,
	quantity int,
) (
	configs []interface{},
	err error,
) {

	var parameters TextLettersParameters
	if err = GetComplexityConfig(sql, "text-letters", complexity, &parameters); err != nil {
		return nil, err
	}

	rows, err := sql.Query(`
		SELECT
			data
		FROM (
			SELECT
	      data
	    FROM public.trainers_data_texts
	    WHERE type = 'expression'
	    ORDER BY char_length(data)
	    LIMIT 20
		) t
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
		config := newTextLettersConfig(uint16(parameters.TimeLimit))
		if err = rows.Scan(&config.Data); err != nil {
			return nil, err
		}

		configs = append(configs, config)
	}

	return configs, nil
}
