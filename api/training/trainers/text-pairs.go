package trainers

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/uuid"
)

type TextPairsMode string

const (
	TextPairsMode_Play TextPairsMode = "play"
	TextPairsMode_Show TextPairsMode = "show"
)

type TextPairsType string

const (
	TextPairsType_Antonyms TextPairsType = "antonyms"
	TextPairsType_Paronyms TextPairsType = "paronyms"
	TextPairsType_Synonyms TextPairsType = "synonyms"
	TextPairsType_Specific TextPairsType = "specific"
)

type TextPairsParameters struct {
	ItemsLimit int `json:"itemsLimit"`
	TimeLimit  int `json:"timeLimit"`
}

type TextPairsConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit uint16 `json:"timeLimit"`

	Mode  TextPairsMode `json:"mode"`
	Type  TextPairsType `json:"type"`
	Items [][]string    `json:"items"`
}

func newTextPairsConfig(tpy TextPairsType, timeLimit uint16) *TextPairsConfig {
	return &TextPairsConfig{
		ID:        "text-pairs",
		UID:       uuid.UUID(),
		TimeLimit: timeLimit,

		Mode: TextPairsMode_Play,
		Type: tpy,
	}
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

	config := newTextPairsConfig(TextPairsType_Antonyms, uint16(parameters.TimeLimit))

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

	config := newTextPairsConfig(TextPairsType_Synonyms, uint16(parameters.TimeLimit))

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

func TextPairsParonyms(
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

	config := newTextPairsConfig(TextPairsType_Paronyms, uint16(parameters.TimeLimit))

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
          unnest(dataTable."paronyms") AS "word"
        FROM (
          SELECT
            "id",
            paronyms
          FROM public.trainers_data_words_paronyms
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

func TextPairsSpecific(
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

	config := newTextPairsConfig(TextPairsType_Specific, uint16(parameters.TimeLimit))

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
          unnest(dataTable."words") AS "word"
        FROM (
          SELECT
            "id",
            words
          FROM public.trainers_data_words_pairs
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

	configB := newTextPairsConfig(TextPairsType_Specific, uint16(parameters.TimeLimit))
	configB.Items = config.Items
	configB.Mode = TextPairsMode_Show

	configs = append(configs, configB)
	configs = append(configs, config)

	return configs, nil
}
