package trainers

import (
	"github.com/google/uuid"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

type TextLettersConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit int    `json:"timeLimit"`
	Data      string `json:"data"`
}

type TextLettersParameters struct {
	ItemsLimit int `json:"itemsLimit"`
	TimeLimit  int `json:"timeLimit"`
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
    FROM public.trainers_data_texts
    WHERE type = 'expression'
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
		uid, err := uuid.NewUUID()
		if err != nil {
			return nil, err
		}

		config := &TextLettersConfig{
			ID:        "text-letters",
			UID:       uid.String(),
			TimeLimit: parameters.TimeLimit,
		}

		if err = rows.Scan(&config.Data); err != nil {
			return nil, err
		}

		configs = append(configs, config)
	}

	return configs, nil
}
