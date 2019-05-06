package trainers

import (
	"github.com/google/uuid"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

type TextSortConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit int    `json:"timeLimit"`

	Mode  string   `json:"mode"`
	Items []string `json:"items"`
}

type TextSortParameters struct {
	ItemsLimit int `json:"itemsLimit"`
	TimeLimit  int `json:"timeLimit"`
}

func TextSort(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {

	var parameters TextPairsParameters
	if err = GetComplexityConfig(sql, "text-sort", complexity, &parameters); err != nil {
		return nil, err
	}

	uid, err := uuid.NewUUID()
	if err != nil {
		return nil, err
	}

	config := &TextSortConfig{
		ID:        "text-sort",
		UID:       uid.String(),
		TimeLimit: parameters.TimeLimit,
		Mode:      "show",
	}

	if err := sql.QueryRow(`
    SELECT
      array_agg(dataTable."word") AS "words"
    FROM (
      SELECT word
      FROM public.trainers_data_words_columns
      ORDER BY random()
      LIMIT $1
    ) dataTable
    `,
		parameters.ItemsLimit,
	).Scan(&config.Items); err != nil {
		return nil, err
	}

	uid, err = uuid.NewUUID()
	if err != nil {
		return nil, err
	}

	configB := &TextSortConfig{
		ID:        "text-sort",
		UID:       uid.String(),
		TimeLimit: 60,
		Items:     make([]string, len(config.Items)),
		Mode:      "play",
	}

	configs = append(configs, config)
	configs = append(configs, configB)
	return configs, nil
}
