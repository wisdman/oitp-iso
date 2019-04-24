package trainers

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/uuid"
)

type ClassificationType string

const (
	ClassificationType_Colors ClassificationType = "colors"
	ClassificationType_Words  ClassificationType = "words"
)

type ClassificationItem struct {
	Group     string `json:"group"`
	Data      string `json:"data"`
	TimeLimit int    `json:"timeLimit"`
}

type ClassificationConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit uint16 `json:"timeLimit"`

	Type  ClassificationType    `json:"type"`
	Items []*ClassificationItem `json:"items"`
}

func newClassificationConfig(tpy ClassificationType, timeLimit uint16) *ClassificationConfig {
	return &ClassificationConfig{
		ID:        "classification",
		UID:       uuid.UUID(),
		TimeLimit: timeLimit,

		Type: tpy,
	}
}

// Classification Colors

type ClassificationColorsParameters struct {
	ItemsLimit    int `json:"itemsLimit"`
	ItemTimeLimit int `json:"itemTimeLimit"`
	TimeLimit     int `json:"timeLimit"`
}

func ClassificationColors(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	var parameters ClassificationColorsParameters
	if err = GetComplexityConfig(sql, "classification-colors", complexity, &parameters); err != nil {
		return nil, err
	}

	config := newClassificationConfig(ClassificationType_Colors, uint16(parameters.TimeLimit))

	rows, err := sql.Query(`
    SELECT
      '#' || "color" AS "group",
      "title" AS "data"
    FROM public.trainers_data_classification_colors
    ORDER BY random()
    LIMIT $1
    `,
		parameters.ItemsLimit,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		item := &ClassificationItem{}
		if err = rows.Scan(&item.Group, &item.Data); err != nil {
			return nil, err
		}

		item.TimeLimit = parameters.ItemTimeLimit
		config.Items = append(config.Items, item)
	}

	configs = append(configs, config)
	return configs, nil
}

// Classification Words

type ClassificationWordsParameters struct {
	GroupLimit    int `json:"groupLimit"`
	ItemsLimit    int `json:"itemsLimit"`
	ItemTimeLimit int `json:"itemTimeLimit"`
	TimeLimit     int `json:"timeLimit"`
}

func ClassificationWords(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	var parameters ClassificationWordsParameters
	if err = GetComplexityConfig(sql, "classification-words", complexity, &parameters); err != nil {
		return nil, err
	}

	config := newClassificationConfig(ClassificationType_Words, uint16(parameters.TimeLimit))

	rows, err := sql.Query(`
    SELECT
      "group",
      "data"
    FROM (
      SELECT
        ROW_NUMBER() OVER (PARTITION BY "group" ORDER BY random()) AS cnt,
        middleTable.*
      FROM (
        SELECT
          unnest(dataTable."data") AS "data",
          dataTable."group" AS "group"
        FROM (
          SELECT
            "group",
            "data"
          FROM
            public.trainers_data_classification_words
          ORDER BY random()
          LIMIT $1
        ) dataTable
      ) middleTable
    ) partedTable
    WHERE partedTable.cnt <= $2
    ORDER BY random()
    `,
		parameters.GroupLimit,
		parameters.ItemsLimit,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		item := &ClassificationItem{}
		if err = rows.Scan(&item.Group, &item.Data); err != nil {
			return nil, err
		}

		item.TimeLimit = parameters.ItemTimeLimit
		config.Items = append(config.Items, item)
	}

	configs = append(configs, config)
	return configs, nil
}
