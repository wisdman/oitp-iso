package matrixSequence

import (
	"math/rand"
	"time"

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
	var parameters Parameters
	if err = trainers.QueryParameters(sql, trainers.MatrixSequence, complexity, &parameters); err != nil {
		return nil, err
	}

	rows, err := sql.Query(`
    SELECT
      "data"
    FROM public.trainers_data_patterns
    WHERE
      "type" = 'numbers'
      AND
      array_length("data", 1) = $1
    ORDER BY random()
    LIMIT $2
    `,
		parameters.Size,
		parameters.Quantity,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		config := newConfig(parameters)
		if err = rows.Scan(&config.Matrix); err != nil {
			return nil, err
		}
		configs = append(configs, config)
	}

	return configs, nil
}

func BuildRandom(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	rand.Seed(time.Now().UnixNano())

	var parameters Parameters
	if err = trainers.QueryParameters(sql, trainers.MatrixRandomSequence, complexity, &parameters); err != nil {
		return nil, err
	}

	var i uint8
	for i = 0; i < parameters.Quantity; i++ {
		config := newConfig(parameters)
		for j, max := 0, len(config.Matrix); j < max; j++ {
			config.Matrix[j] = uint16(j + 1)
		}
		rand.Shuffle(len(config.Matrix), func(i, j int) { config.Matrix[i], config.Matrix[j] = config.Matrix[j], config.Matrix[i] })
		configs = append(configs, config)
	}

	return configs, nil
}
