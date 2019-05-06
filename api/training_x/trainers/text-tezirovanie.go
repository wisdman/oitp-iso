package trainers

import (
	"github.com/google/uuid"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

type TextTezirovanieConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit int    `json:"timeLimit"`
	Data      string `json:"data"`
}

type TextTezirovanieParameters struct {
	TimeLimit int `json:"timeLimit"`
}

func TextTezirovanie(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {

	var parameters TextTezirovanieParameters
	if err = GetComplexityConfig(sql, "text-tezirovanie", complexity, &parameters); err != nil {
		return nil, err
	}

	uid, err := uuid.NewUUID()
	if err != nil {
		return nil, err
	}

	config := &TextTezirovanieConfig{
		ID:        "text-tezirovanie",
		UID:       uid.String(),
		TimeLimit: parameters.TimeLimit,
	}

	if err := sql.QueryRow(`
    SELECT
      "data"
    FROM public.trainers_data_texts
    WHERE "type" = 'tezirovanie'
    ORDER BY random()
    LIMIT 1`,
	).Scan(&config.Data); err != nil {
		return nil, err
	}

	configs = append(configs, config)
	return configs, nil
}
