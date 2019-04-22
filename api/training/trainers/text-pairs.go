package trainers

import (
	"github.com/google/uuid"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

type TextPairsConfig struct {
	ID        string     `json:"id"`
	UID       string     `json:"uid"`
	TimeLimit int        `json:"timeLimit"`
	Items     [][]string `json:"items"`
	Title     string     `json:"title"`
}

type TextPairsParameters struct {
	ItemsLimit int `json:"itemsLimit"`
	TimeLimit  int `json:"timeLimit"`
}

func TextPairsAntonyms(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {

	var parameters TextPairsParameters
	if err = GetComplexityConfig(sql, "text-pairs", complexity, &parameters); err != nil {
		return nil, err
	}

	uid, err := uuid.NewUUID()
	if err != nil {
		return nil, err
	}

	config := &TextPairsConfig{
		ID:        "text-pairs",
		UID:       uid.String(),
		TimeLimit: parameters.TimeLimit,
		Title:     "Отметьте антонимы",
	}

	rows, err := sql.Query(`
    SELECT
      array["A", "B"] AS "words"
    FROM (
      SELECT
        ROW_NUMBER() OVER (PARTITION BY "A" ORDER BY random()) AS cnt,
        middleTable.*
      FROM (
        SELECT
          dataTable."word" AS "A",
          unnest(dataTable."antonyms") AS "B"
        FROM (
          SELECT
            word,
            antonyms
          FROM public.trainers_data_words_antonyms
          ORDER BY random()
          LIMIT $1
        ) dataTable
      ) middleTable
    ) partedTable
    WHERE partedTable.cnt = 1
    ORDER BY random()
    `,
		parameters.ItemsLimit,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var pair []string
		if err = rows.Scan(&pair); err != nil {
			return nil, err
		}

		config.Items = append(config.Items, pair)
	}

	configs = append(configs, config)
	return configs, nil
}

func TextPairsSynonyms(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {

	var parameters TextPairsParameters
	if err = GetComplexityConfig(sql, "text-pairs", complexity, &parameters); err != nil {
		return nil, err
	}

	uid, err := uuid.NewUUID()
	if err != nil {
		return nil, err
	}

	config := &TextPairsConfig{
		ID:        "text-pairs",
		UID:       uid.String(),
		TimeLimit: parameters.TimeLimit,
		Title:     "Отметьте синонимы",
	}

	rows, err := sql.Query(`
    SELECT
      array_agg("word") AS "words"
    FROM (
      SELECT
        ROW_NUMBER() OVER (PARTITION BY "id" ORDER BY random()) AS cnt,
        middleTable.*
      FROM (
        SELECT
          dataTable."id",
          unnest(dataTable."synonyms") AS "word"
        FROM (
          SELECT
            "id",
            synonyms
          FROM public.trainers_data_words_synonyms
          ORDER BY random()
          LIMIT $1
        ) dataTable
      ) middleTable
    ) partedTable
    WHERE partedTable.cnt <= 2
    GROUP BY "id"
    ORDER BY random()
    `,
		parameters.ItemsLimit,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var pair []string
		if err = rows.Scan(&pair); err != nil {
			return nil, err
		}

		config.Items = append(config.Items, pair)
	}

	configs = append(configs, config)
	return configs, nil
}
