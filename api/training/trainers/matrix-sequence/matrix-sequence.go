package matrixSequence

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
	if err = trainers.QueryParameters(sql, trainers.MatrixSequence, complexity, &params); err != nil {
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
		params.MatrixSize,
		params.Quantity,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		config := newConfig(params)
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
	var params Parameters
	if err = trainers.QueryParameters(sql, trainers.MatrixRandomSequence, complexity, &params); err != nil {
		return nil, err
	}

	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params)
		for j, max := 0, len(config.Matrix); j < max; j++ {
			config.Matrix[j] = uint16(j + 1)
		}
		rand.Shuffle(len(config.Matrix), func(i, j int) { config.Matrix[i], config.Matrix[j] = config.Matrix[j], config.Matrix[i] })
		configs = append(configs, config)
	}

	return configs, nil
}
