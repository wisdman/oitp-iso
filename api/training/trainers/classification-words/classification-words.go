package classificationWords

import (
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/training/trainers"
)

func Build(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	var params Parameters
	if err = trainers.QueryParameters(sql, trainers.ClassificationWords, complexity, &params); err != nil {
		return nil, err
	}

	itemsCounts := make([]int, params.Quantity)
	var maxItems int
	for i := 0; i < params.Quantity; i++ {
		length := rand.Intn(params.MaxItems-params.MinItems+1) + params.MinItems
		itemsCounts[i] = length
		if length > maxItems {
			maxItems = length
		}
	}

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
		params.Quantity,
		maxItems,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	config := newConfig(params)

	for rows.Next() {
		item := &Item{}
		if err = rows.Scan(&item.Group, &item.Data); err != nil {
			return nil, err
		}
		config.Items = append(config.Items, item)
	}

	configs = append(configs, config)
	return configs, nil
}
