package matrixSequence

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexityPatternData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 30,

		Quantity:   3,
		MatrixSize: 25,

		ShowSuccess: true,
	},
	Parameters{
		PlayTimeLimit: 30,

		Quantity:   3,
		MatrixSize: 25,

		ShowSuccess: false,
	},
	Parameters{
		PlayTimeLimit: 20,

		Quantity:   5,
		MatrixSize: 25,

		ShowSuccess: false,
	},
}

func BuildPattern(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityPatternData[complexity]

	rows, err := sql.Query(`
    SELECT
      "data"
    FROM public.trainers_patterns
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
